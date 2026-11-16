import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AppNotification } from "../types/notification.ts";

/* Almacén global y único de notificaciones (Desarrollo Web Full Stack).
   El WebSocket del laboratorio no guarda nada por su cuenta: valida el evento
   y llama a addNotification. El contador del encabezado, el panel y el aviso
   leen todos de aquí. */

const MAXIMO_NOTIFICACIONES = 50;

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  /* useCallback con dependencias vacías: la referencia no cambia entre
     renders. El efecto del WebSocket depende de esta función; si cambiara,
     cerraría y abriría la conexión en cada notificación recibida.
     Deduplica por id: el mismo evento recibido dos veces (reconexión, dos
     pestañas del mismo usuario reenviando) solo se guarda una vez. */
  const addNotification = useCallback((notification: AppNotification) => {
    setNotifications((actuales) => {
      if (actuales.some((n) => n.id === notification.id)) return actuales;
      return [notification, ...actuales].slice(0, MAXIMO_NOTIFICACIONES);
    });
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((actuales) =>
      actuales.map((n) => (n.id === id && !n.read ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((actuales) =>
      actuales.some((n) => !n.read) ? actuales.map((n) => (n.read ? n : { ...n, read: true })) : actuales
    );
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
    }),
    [notifications, addNotification, markAsRead, markAllAsRead, clearNotifications]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications(): NotificationContextValue {
  const contexto = useContext(NotificationContext);
  if (contexto === null) {
    throw new Error("useNotifications debe usarse dentro de <NotificationProvider>");
  }
  return contexto;
}
