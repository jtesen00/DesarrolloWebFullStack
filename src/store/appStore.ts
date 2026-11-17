import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppNotification } from "../types/notification.ts";

/* Estado global del cliente (semana 11, Laboratorio). Reemplaza a
   NotificationContext y al hook useTema.

   Qué vive aquí y qué no:
   · theme ............ preferencia del usuario → se persiste en localStorage.
   · notifications .... avisos temporales → solo en memoria, con límite.
   · conexion ......... estado del WebSocket → solo en memoria.
   · El catálogo NO: son datos remotos y los administra TanStack Query. */

export type Theme = "light" | "dark";

export type EstadoConexion = "sin-configurar" | "conectando" | "conectado" | "desconectado";

export interface Conexion {
  estado: EstadoConexion;
  sala: string | null;
  miembros: number | null;
  ultimoError: string | null;
}

interface AppState {
  theme: Theme;
  notifications: AppNotification[];
  conexion: Conexion;

  setTheme: (theme: Theme) => void;
  addNotification: (notification: AppNotification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  setConexion: (cambios: Partial<Conexion>) => void;
}

export const STORE_KEY = "experiencias-app-store";
export const MAXIMO_NOTIFICACIONES = 50;
const CLASE_OSCURA = "tema-oscuro";

/* Valor de partida: el que index.html ya aplicó antes del primer cuadro
   (preferencia guardada o la del sistema). Si hay algo guardado, persist lo
   reemplaza al hidratar. */
function temaInicial(): Theme {
  return document.documentElement.classList.contains(CLASE_OSCURA) ? "dark" : "light";
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: temaInicial(),
      notifications: [],
      conexion: {
        estado: import.meta.env.VITE_WS_URL ? "conectando" : "sin-configurar",
        sala: null,
        miembros: null,
        ultimoError: null,
      },

      setTheme: (theme) => set({ theme }),

      /* Deduplica por id (reconexiones, reenvíos) y conserva solo las 50 más
         recientes: así la memoria no crece sin fin en una sesión larga. */
      addNotification: (notification) =>
        set((s) =>
          s.notifications.some((n) => n.id === notification.id)
            ? s
            : { notifications: [notification, ...s.notifications].slice(0, MAXIMO_NOTIFICACIONES) }
        ),

      markAsRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id && !n.read ? { ...n, read: true } : n)),
        })),

      markAllAsRead: () =>
        set((s) =>
          s.notifications.some((n) => !n.read)
            ? { notifications: s.notifications.map((n) => (n.read ? n : { ...n, read: true })) }
            : s
        ),

      clearNotifications: () => set({ notifications: [] }),

      setConexion: (cambios) => set((s) => ({ conexion: { ...s.conexion, ...cambios } })),
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      /* Solo se guarda el tema. Ni notificaciones (avisos viejos al volver),
         ni la conexión, ni nada sensible: localStorage lo lee cualquier
         script de la página. */
      partialize: (s) => ({ theme: s.theme }),
      /* Valida lo que viene de localStorage: cualquiera pudo editarlo. */
      merge: (guardado, actual) => {
        const theme = (guardado as { theme?: unknown } | undefined)?.theme;
        return theme === "light" || theme === "dark" ? { ...actual, theme } : actual;
      },
    }
  )
);

/* El tema se refleja en <html> en el mismo instante en que cambia el store
   (no en un efecto posterior). Así la View Transition de cambiarTema puede
   fotografiar el antes y el después. */
function aplicarTema(theme: Theme): void {
  document.documentElement.classList.toggle(CLASE_OSCURA, theme === "dark");
}

aplicarTema(useAppStore.getState().theme);
useAppStore.subscribe((estado, anterior) => {
  if (estado.theme !== anterior.theme) aplicarTema(estado.theme);
});

/* Selectores reutilizables. Devuelven valores simples para que el componente
   solo se vuelva a dibujar cuando ese valor cambia. */
export const selectUnreadCount = (s: AppState) => s.notifications.reduce((total, n) => total + (n.read ? 0 : 1), 0);
export const selectEsOscuro = (s: AppState) => s.theme === "dark";
