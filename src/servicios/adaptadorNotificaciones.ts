import { CURSOS } from "../datos/cursos.ts";
import { NOTIFICATION_TYPES } from "../types/notification.ts";
import type { AppNotification, ExperienceNotificationEvent, NotificationType } from "../types/notification.ts";

/* Adaptador de eventos: lo que llega por el WebSocket es texto que cualquiera
   pudo escribir. TypeScript no lo revisa al ejecutar, así que aquí se
   comprueba campo por campo antes de que entre en el store Zustand. */

export const ETIQUETAS_TIPO: Record<NotificationType, string> = {
  NEW_EXPERIENCE: "Nueva experiencia",
  SCHEDULE_CHANGE: "Cambio de horario",
  REMINDER: "Recordatorio",
};

function esTextoNoVacio(valor: unknown): valor is string {
  return typeof valor === "string" && valor.trim() !== "";
}

function esTipoValido(valor: unknown): valor is NotificationType {
  return typeof valor === "string" && (NOTIFICATION_TYPES as readonly string[]).includes(valor);
}

export function esEventoDeNotificacion(valor: unknown): valor is ExperienceNotificationEvent {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return (
    esTextoNoVacio(v.id) &&
    esTextoNoVacio(v.title) &&
    esTextoNoVacio(v.message) &&
    esTextoNoVacio(v.createdAt) &&
    !Number.isNaN(Date.parse(v.createdAt)) &&
    esTipoValido(v.type)
  );
}

/* Transformación explícita del evento al formato del contexto. Se copian
   solo los campos del contrato: una propiedad extra del servidor no entra
   en el estado global. */
export function aNotificacion(evento: ExperienceNotificationEvent): AppNotification {
  return {
    id: evento.id,
    title: evento.title,
    message: evento.message,
    createdAt: evento.createdAt,
    type: evento.type,
    read: false,
  };
}

/* crypto.randomUUID solo existe en contexto seguro (https o localhost). Al
   probar desde otra computadora por http://IP-local no está disponible. */
function nuevoId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/* Notificaciones de muestra para el botón de prueba, con cursos reales del
   catálogo para que el aviso se lea como uno de verdad. */
export function crearNotificacionDePrueba(tipo: NotificationType): ExperienceNotificationEvent {
  const curso = CURSOS[Math.floor(Math.random() * CURSOS.length)];
  const textos: Record<NotificationType, { title: string; message: string }> = {
    NEW_EXPERIENCE: {
      title: "Nueva experiencia",
      message: `Se publicó «${curso.titulo}» en el catálogo.`,
    },
    SCHEDULE_CHANGE: {
      title: "Cambio de horario",
      message: `La sesión en vivo de «${curso.titulo}» pasa al jueves a las 19:00.`,
    },
    REMINDER: {
      title: "Tu clase empieza pronto",
      message: `«${curso.titulo}» comienza en 30 minutos.`,
    },
  };

  return {
    id: nuevoId(),
    ...textos[tipo],
    createdAt: new Date().toISOString(),
    type: tipo,
  };
}
