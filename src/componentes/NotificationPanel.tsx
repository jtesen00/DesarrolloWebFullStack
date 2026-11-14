import { useId, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { selectUnreadCount, useAppStore } from "../store/appStore.ts";
import type { EstadoConexion } from "../store/appStore.ts";
import { ETIQUETAS_TIPO } from "../servicios/adaptadorNotificaciones.ts";
import { cambiarSala, getSalaPedida, publicarIncompleta, publicarNotificacion } from "../servicios/socketExperiencias.ts";
import { NOTIFICATION_TYPES } from "../types/notification.ts";
import type { NotificationType } from "../types/notification.ts";

const TEXTO_ESTADO: Record<EstadoConexion, string> = {
  "sin-configurar": "Sin configurar (falta VITE_WS_URL)",
  conectando: "Conectando…",
  conectado: "En vivo",
  desconectado: "Sin conexión · reintentando",
};

const formatoHora = new Intl.DateTimeFormat("es-PE", { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

interface NotificationPanelProps {
  id: string;
}

/* Historial de notificaciones y estado de la conexión (los dos en el store
   Zustand) y herramientas de prueba que envían por la única conexión. */
export default function NotificationPanel({ id }: NotificationPanelProps) {
  const notifications = useAppStore((s) => s.notifications);
  const unreadCount = useAppStore(selectUnreadCount);
  const markAsRead = useAppStore((s) => s.markAsRead);
  const markAllAsRead = useAppStore((s) => s.markAllAsRead);
  const clearNotifications = useAppStore((s) => s.clearNotifications);
  const { estado, sala, miembros, ultimoError } = useAppStore((s) => s.conexion);
  const reducirMovimiento = useReducedMotion();
  const [tipo, setTipo] = useState<NotificationType>("NEW_EXPERIENCE");
  const [salaEscrita, setSalaEscrita] = useState(() => sala ?? getSalaPedida());
  const idTitulo = useId();
  const idTipo = useId();
  const idSala = useId();
  const conectado = estado === "conectado";

  function alCambiarSala(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    cambiarSala(salaEscrita);
  }

  return (
    <section id={id} className="notificaciones__panel" aria-labelledby={idTitulo}>
      <div className="notificaciones__cabecera">
        <h2 id={idTitulo} className="notificaciones__titulo">Notificaciones</h2>
        <div className="notificaciones__acciones">
          <button type="button" className="notificaciones__enlace" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Marcar todas como leídas
          </button>
          <button type="button" className="notificaciones__enlace" onClick={clearNotifications} disabled={notifications.length === 0}>
            Limpiar
          </button>
        </div>
      </div>

      <p className={`notificaciones__estado notificaciones__estado--${estado}`}>
        <span className="notificaciones__punto" aria-hidden="true"></span>
        {TEXTO_ESTADO[estado]}
        {sala && <> · sala <strong>{sala}</strong>{miembros !== null && ` (${miembros} conectado${miembros === 1 ? "" : "s"})`}</>}
      </p>

      {notifications.length === 0 ? (
        <p className="notificaciones__vacio">Aún no hay notificaciones. Las nuevas aparecerán aquí sin recargar la página.</p>
      ) : (
        <ol className="notificaciones__lista">
          <AnimatePresence initial={false}>
            {notifications.map((n) => (
              <m.li
                key={n.id}
                initial={reducirMovimiento ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`notificaciones__item${n.read ? "" : " notificaciones__item--nueva"}`}
              >
                <p className="notificaciones__meta">
                  <span>{ETIQUETAS_TIPO[n.type]}</span>
                  <time dateTime={n.createdAt}>{formatoHora.format(new Date(n.createdAt))}</time>
                </p>
                <h3 className="notificaciones__item-titulo">
                  {!n.read && <span className="visualmente-oculto">Sin leer: </span>}
                  {n.title}
                </h3>
                <p className="notificaciones__mensaje">{n.message}</p>
                {!n.read && (
                  <button type="button" className="notificaciones__enlace" onClick={() => markAsRead(n.id)}>
                    Marcar como leída<span className="visualmente-oculto">: {n.title}</span>
                  </button>
                )}
              </m.li>
            ))}
          </AnimatePresence>
        </ol>
      )}

      <details className="notificaciones__pruebas" open>
        <summary>Pruebas en tiempo real</summary>

        <div className="notificaciones__fila">
          <label htmlFor={idTipo} className="visualmente-oculto">Tipo de notificación</label>
          <select id={idTipo} value={tipo} onChange={(e) => setTipo(e.target.value as NotificationType)}>
            {NOTIFICATION_TYPES.map((t) => (
              <option key={t} value={t}>{ETIQUETAS_TIPO[t]}</option>
            ))}
          </select>
          <button type="button" className="boton boton--primario" onClick={() => publicarNotificacion(tipo)} disabled={!conectado}>
            Generar notificación de prueba
          </button>
        </div>

        <form className="notificaciones__fila" onSubmit={alCambiarSala}>
          <label htmlFor={idSala}>Sala</label>
          <input
            id={idSala}
            type="text"
            value={salaEscrita}
            maxLength={60}
            required
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setSalaEscrita(e.target.value)}
          />
          <button type="submit" className="boton boton--secundario" disabled={!conectado}>Cambiar sala</button>
        </form>

        <button type="button" className="notificaciones__enlace" onClick={publicarIncompleta} disabled={!conectado}>
          Enviar payload incompleto (debe rechazarse)
        </button>

        <p className="notificaciones__error" role="status">
          {ultimoError && <>Servidor: {ultimoError}</>}
        </p>
      </details>
    </section>
  );
}
