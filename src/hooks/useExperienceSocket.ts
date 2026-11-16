import { useCallback, useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext.tsx";
import { aNotificacion, crearNotificacionDePrueba, esEventoDeNotificacion } from "../servicios/adaptadorNotificaciones.ts";
import type { ClientAction, NotificationType, ServerMessage } from "../types/notification.ts";

/* Cliente WebSocket de la plataforma. Abre UNA conexión con el servidor del
   equipo (VITE_WS_URL), se une a una sala, valida cada evento recibido y lo
   entrega a addNotification. También expone funciones para enviar acciones
   al servidor por la misma conexión (comunicación bidireccional).

   Se usa una sola vez, desde LiveNotificationFeed: montarlo en cada tarjeta
   abriría una conexión por tarjeta. */

export type EstadoConexion = "sin-configurar" | "conectando" | "conectado" | "desconectado";

export const SALA_POR_DEFECTO = "experiencias";
const CLAVE_SALA = "wayra-sala";
const ESPERA_MAXIMA_MS = 15_000;

/* La sala se recuerda por pestaña (sessionStorage): así dos ventanas pueden
   estar en salas distintas para la prueba multiusuario. ?sala=nombre en la
   dirección también la elige. */
function salaInicial(): string {
  try {
    const deLaUrl = new URLSearchParams(window.location.search).get("sala")?.trim();
    if (deLaUrl) return deLaUrl;
    return sessionStorage.getItem(CLAVE_SALA)?.trim() || SALA_POR_DEFECTO;
  } catch {
    return SALA_POR_DEFECTO;
  }
}

function recordarSala(sala: string): void {
  try {
    sessionStorage.setItem(CLAVE_SALA, sala);
  } catch {
    // Sin almacenamiento se usa la sala por defecto al recargar.
  }
}

function interpretarMensaje(texto: unknown): ServerMessage | null {
  if (typeof texto !== "string") return null;
  try {
    const dato: unknown = JSON.parse(texto);
    if (typeof dato !== "object" || dato === null || typeof (dato as { event?: unknown }).event !== "string") return null;
    return dato as ServerMessage;
  } catch {
    return null;
  }
}

export function useExperienceSocket() {
  const { addNotification } = useNotifications();
  const url = import.meta.env.VITE_WS_URL;

  const socketRef = useRef<WebSocket | null>(null);
  const salaPedidaRef = useRef<string>(salaInicial());

  const [estado, setEstado] = useState<EstadoConexion>(url ? "conectando" : "sin-configurar");
  const [sala, setSala] = useState<string | null>(null);
  const [miembros, setMiembros] = useState<number | null>(null);
  const [ultimoError, setUltimoError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      console.error("Falta configurar VITE_WS_URL en .env.local");
      return;
    }

    let activo = true;
    let intentos = 0;
    let reintento: number | undefined;
    let socket: WebSocket;
    // Al desmontar se abortan todos los listeners de una vez.
    const limpieza = new AbortController();

    function enviar(accion: ClientAction) {
      if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(accion));
    }

    function alRecibir(mensaje: ServerMessage) {
      switch (mensaje.event) {
        case "room:joined":
          setSala(mensaje.payload.room);
          setMiembros(mensaje.payload.members ?? null);
          setUltimoError(null);
          return;
        case "room:members":
          setMiembros(mensaje.payload.members);
          return;
        case "server:error":
          setUltimoError(mensaje.payload.message);
          console.warn("El servidor rechazó la acción:", mensaje.payload.message);
          return;
        case "notification:new":
          if (!esEventoDeNotificacion(mensaje.payload)) {
            console.warn("Notificación inválida", mensaje.payload);
            return;
          }
          addNotification(aNotificacion(mensaje.payload));
          return;
        case "server:ready":
          return;
      }
    }

    function abrir() {
      socket = new WebSocket(url!);
      socketRef.current = socket;
      const { signal } = limpieza;

      socket.addEventListener("open", () => {
        intentos = 0;
        setEstado("conectado");
        console.info("Conectado al servidor WebSocket");
        // También al reconectar: el servidor nuevo no recuerda la sala.
        enviar({ action: "join-room", room: salaPedidaRef.current });
      }, { signal });

      socket.addEventListener("message", (evento) => {
        const mensaje = interpretarMensaje(evento.data);
        if (mensaje) alRecibir(mensaje);
        else console.error("No se pudo interpretar el mensaje recibido");
      }, { signal });

      socket.addEventListener("error", () => {
        console.error("Error en la conexión WebSocket");
      }, { signal });

      // Si el servidor se detiene, se reintenta con espera creciente
      // (1 s, 2 s, 4 s… hasta 15 s) en lugar de insistir sin pausa.
      socket.addEventListener("close", () => {
        if (socketRef.current === socket) socketRef.current = null;
        if (!activo) return;
        console.info("Conexión WebSocket cerrada");
        setEstado("desconectado");
        setSala(null);
        setMiembros(null);
        const espera = Math.min(1000 * 2 ** intentos, ESPERA_MAXIMA_MS);
        intentos += 1;
        reintento = window.setTimeout(() => {
          setEstado("conectando");
          abrir();
        }, espera);
      }, { signal });
    }

    abrir();

    return () => {
      activo = false;
      window.clearTimeout(reintento);
      limpieza.abort();
      if (socketRef.current === socket) socketRef.current = null;
      socket.close(1000, "Componente desmontado");
    };
  }, [url, addNotification]);

  /* Envía por la conexión ya abierta; nunca crea una nueva. Devuelve false
     si el socket no está abierto (readyState distinto de OPEN). */
  const enviarAccion = useCallback((accion: ClientAction): boolean => {
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setUltimoError("No hay conexión con el servidor");
      return false;
    }
    socket.send(JSON.stringify(accion));
    return true;
  }, []);

  const publicarNotificacion = useCallback(
    (tipo: NotificationType) => enviarAccion({ action: "publish-notification", payload: crearNotificacionDePrueba(tipo) }),
    [enviarAccion]
  );

  /* Prueba de validación: le faltan message, createdAt y type. El servidor
     debe responder server:error y no distribuirla. */
  const publicarIncompleta = useCallback(
    () => enviarAccion({ action: "publish-notification", payload: { id: "incompleta", title: "Sin mensaje" } }),
    [enviarAccion]
  );

  const cambiarSala = useCallback(
    (nueva: string) => {
      const limpia = nueva.trim();
      if (!limpia) return false;
      salaPedidaRef.current = limpia;
      recordarSala(limpia);
      return enviarAccion({ action: "join-room", room: limpia });
    },
    [enviarAccion]
  );

  return {
    estado,
    sala,
    miembros,
    ultimoError,
    publicarNotificacion,
    publicarIncompleta,
    cambiarSala,
  };
}
