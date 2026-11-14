import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useNotifications } from "../context/NotificationContext.tsx";
import { ETIQUETAS_TIPO } from "../servicios/adaptadorNotificaciones.ts";

const DURACION_MS = 6000;

/* Aviso breve de la última notificación recibida. No guarda notificaciones:
   lee la más reciente de NotificationContext y solo recuerda cuál se cerró.

   La región aria-live="polite" está siempre en la página (vacía al
   principio): un lector de pantalla solo anuncia los cambios dentro de una
   región que ya existía. «polite» espera a que termine lo que se está
   leyendo, porque ninguna de estas novedades es urgente. */
export default function NotificationToast() {
  const { notifications, markAsRead } = useNotifications();
  const reducirMovimiento = useReducedMotion();
  const ultima = notifications[0];
  // La que había al montar no se anuncia: no es una novedad.
  const [cerradaId, setCerradaId] = useState<string | undefined>(ultima?.id);
  const [pausado, setPausado] = useState(false);
  const visible = ultima && ultima.id !== cerradaId && !ultima.read ? ultima : null;
  const visibleId = visible?.id;

  // Al cerrar con el puntero encima, pointerleave no llega a dispararse:
  // se quita la pausa a mano para que el siguiente aviso sí se oculte solo.
  function cerrar(id: string, marcarLeida = false) {
    setPausado(false);
    if (marcarLeida) markAsRead(id);
    else setCerradaId(id);
  }

  // Se oculta sola tras unos segundos, salvo con el puntero o el foco encima
  // (quien lee despacio o navega con teclado necesita más tiempo).
  useEffect(() => {
    if (!visibleId || pausado) return;
    const temporizador = window.setTimeout(() => setCerradaId(visibleId), DURACION_MS);
    return () => window.clearTimeout(temporizador);
  }, [visibleId, pausado]);

  return (
    <div className="aviso-region" aria-live="polite" aria-atomic="true">
      <AnimatePresence>
        {visible && (
          <m.div
            key={visible.id}
            className="aviso"
            initial={reducirMovimiento ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducirMovimiento ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onPointerEnter={() => setPausado(true)}
            onPointerLeave={() => setPausado(false)}
            onFocus={() => setPausado(true)}
            onBlur={() => setPausado(false)}
          >
            <p className="aviso__tipo">{ETIQUETAS_TIPO[visible.type]}</p>
            <p className="aviso__titulo">{visible.title}</p>
            <p className="aviso__mensaje">{visible.message}</p>
            <div className="aviso__acciones">
              <button type="button" className="notificaciones__enlace" onClick={() => cerrar(visible.id, true)}>
                Marcar como leída
              </button>
              <button type="button" className="aviso__cerrar" aria-label="Cerrar aviso" onClick={() => cerrar(visible.id)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
