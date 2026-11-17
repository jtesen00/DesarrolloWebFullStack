import { useEffect } from "react";
import { useAppStore } from "../store/appStore.ts";
import { aNotificacion, esEventoDeNotificacion } from "../servicios/adaptadorNotificaciones.ts";
import { getSalaPedida, liberarSocket, registrarSocket } from "../servicios/socketExperiencias.ts";
import type { ClientAction, ServerMessage } from "../types/notification.ts";

/* Cliente WebSocket de la plataforma (semana 10), conectado ahora al store
   Zustand (semana 11). Abre UNA conexión con el servidor del equipo
   (VITE_WS_URL), se une a una sala, valida cada evento y llama a la acción
   addNotification del store. El estado de la conexión también va al store.

   Se usa una sola vez, desde LiveNotificationFeed. Las acciones del store
   se leen con getState() dentro de los listeners: no son dependencias del
   efecto, así un render nunca cierra y vuelve a abrir el socket. */

const ESPERA_MAXIMA_MS = 15_000;

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

function alRecibir(mensaje: ServerMessage): void {
  const { setConexion, addNotification } = useAppStore.getState();
  switch (mensaje.event) {
    case "room:joined":
      setConexion({ sala: mensaje.payload.room, miembros: mensaje.payload.members ?? null, ultimoError: null });
      return;
    case "room:members":
      setConexion({ miembros: mensaje.payload.members });
      return;
    case "server:error":
      setConexion({ ultimoError: mensaje.payload.message });
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

export function useExperienceSocket(): void {
  const url = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    const { setConexion } = useAppStore.getState();
    if (!url) {
      console.error("Falta configurar VITE_WS_URL en .env.local");
      setConexion({ estado: "sin-configurar" });
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

    function abrir() {
      socket = new WebSocket(url!);
      registrarSocket(socket);
      const { signal } = limpieza;

      socket.addEventListener("open", () => {
        intentos = 0;
        setConexion({ estado: "conectado", ultimoError: null });
        console.info("Conectado al servidor WebSocket");
        // También al reconectar: el servidor nuevo no recuerda la sala.
        enviar({ action: "join-room", room: getSalaPedida() });
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
        liberarSocket(socket);
        if (!activo) return;
        console.info("Conexión WebSocket cerrada");
        setConexion({ estado: "desconectado", sala: null, miembros: null });
        const espera = Math.min(1000 * 2 ** intentos, ESPERA_MAXIMA_MS);
        intentos += 1;
        reintento = window.setTimeout(() => {
          setConexion({ estado: "conectando" });
          abrir();
        }, espera);
      }, { signal });
    }

    abrir();

    return () => {
      activo = false;
      window.clearTimeout(reintento);
      limpieza.abort();
      liberarSocket(socket);
      socket.close(1000, "Componente desmontado");
    };
  }, [url]);
}
