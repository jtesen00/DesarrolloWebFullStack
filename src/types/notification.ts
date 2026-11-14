/* Contrato de notificación compartido entre el servidor WebSocket
   (server/server.js) y la aplicación. Se define una sola vez: el contexto,
   el adaptador y los componentes importan estos tipos.

   Los nombres de propiedades son los del contrato acordado en la guía de la
   semana 10 (en inglés); el servidor valida exactamente los mismos campos. */

export const NOTIFICATION_TYPES = ["NEW_EXPERIENCE", "SCHEDULE_CHANGE", "REMINDER"] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

/* Lo que viaja por el WebSocket: el evento de negocio tal como lo envía el
   servidor dentro de { event: "notification:new", payload }. */
export interface ExperienceNotificationEvent {
  id: string;
  title: string;
  message: string;
  /* Fecha en formato ISO 8601, por ejemplo "2026-11-07T15:00:00.000Z". */
  createdAt: string;
  type: NotificationType;
}

/* Lo que guarda NotificationContext: el mismo evento más el estado de
   lectura, que solo existe en el navegador. Se llama AppNotification y no
   Notification para no tapar la API Notification del propio navegador. */
export interface AppNotification extends ExperienceNotificationEvent {
  read: boolean;
}

/* Mensajes que el servidor envía al cliente. */
export type ServerMessage =
  | { event: "server:ready"; payload: { message: string; room?: string } }
  | { event: "room:joined"; payload: { room: string; members?: number } }
  | { event: "room:members"; payload: { room: string; members: number } }
  | { event: "server:error"; payload: { message: string } }
  | { event: "notification:new"; payload: unknown };

/* Acciones que el cliente envía al servidor. */
export type ClientAction =
  | { action: "join-room"; room: string }
  | { action: "publish-notification"; payload: ExperienceNotificationEvent | Partial<ExperienceNotificationEvent> };
