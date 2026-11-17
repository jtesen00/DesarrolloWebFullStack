import { useAppStore } from "../store/appStore.ts";
import { crearNotificacionDePrueba } from "./adaptadorNotificaciones.ts";
import type { ClientAction, NotificationType } from "../types/notification.ts";

/* Servicio de envío por el WebSocket de semana 10. Guarda la referencia a
   la única conexión (la abre useExperienceSocket) para que cualquier
   componente pueda enviar acciones sin abrir otra y sin un Context.
   El estado de la conexión, en cambio, vive en el store (conexion). */

export const SALA_POR_DEFECTO = "experiencias";
const CLAVE_SALA = "wayra-sala";

let socketActual: WebSocket | null = null;

/* La sala se recuerda por pestaña (sessionStorage): dos ventanas pueden estar
   en salas distintas para la prueba multiusuario. ?sala=nombre también vale. */
function salaInicial(): string {
  try {
    const deLaUrl = new URLSearchParams(window.location.search).get("sala")?.trim();
    if (deLaUrl) return deLaUrl;
    return sessionStorage.getItem(CLAVE_SALA)?.trim() || SALA_POR_DEFECTO;
  } catch {
    return SALA_POR_DEFECTO;
  }
}

let salaPedida = salaInicial();

export function getSalaPedida(): string {
  return salaPedida;
}

export function registrarSocket(socket: WebSocket): void {
  socketActual = socket;
}

export function liberarSocket(socket: WebSocket): void {
  if (socketActual === socket) socketActual = null;
}

/* Envía por la conexión abierta; nunca crea una nueva. Devuelve false si el
   socket no está abierto (readyState distinto de OPEN). */
export function enviarAccion(accion: ClientAction): boolean {
  if (!socketActual || socketActual.readyState !== WebSocket.OPEN) {
    useAppStore.getState().setConexion({ ultimoError: "No hay conexión con el servidor" });
    return false;
  }
  socketActual.send(JSON.stringify(accion));
  return true;
}

export function publicarNotificacion(tipo: NotificationType): boolean {
  return enviarAccion({ action: "publish-notification", payload: crearNotificacionDePrueba(tipo) });
}

/* Prueba de validación: le faltan message, createdAt y type. El servidor
   debe responder server:error y no distribuirla. */
export function publicarIncompleta(): boolean {
  return enviarAccion({ action: "publish-notification", payload: { id: "incompleta", title: "Sin mensaje" } });
}

export function cambiarSala(nueva: string): boolean {
  const limpia = nueva.trim();
  if (!limpia) return false;
  salaPedida = limpia;
  try {
    sessionStorage.setItem(CLAVE_SALA, limpia);
  } catch {
    // Sin almacenamiento se usa la sala por defecto al recargar.
  }
  return enviarAccion({ action: "join-room", room: limpia });
}
