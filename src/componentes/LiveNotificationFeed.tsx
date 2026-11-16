import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useExperienceSocket } from "../hooks/useExperienceSocket.ts";

/* Monta el cliente WebSocket una sola vez, dentro de NotificationProvider y
   cerca de la raíz. No dibuja nada propio.

   A diferencia del ejemplo de la guía, envuelve al resto de la aplicación:
   el botón de prueba vive en el panel del encabezado y necesita enviar por
   ESTA conexión, no abrir otra. Lo que comparte es el estado de la conexión
   y las funciones de envío; las notificaciones siguen solo en
   NotificationContext. */

type ConexionEnVivo = ReturnType<typeof useExperienceSocket>;

const ConexionContext = createContext<ConexionEnVivo | null>(null);

export function LiveNotificationFeed({ children }: { children?: ReactNode }) {
  const conexion = useExperienceSocket();
  return <ConexionContext.Provider value={conexion}>{children}</ConexionContext.Provider>;
}

export function useConexionEnVivo(): ConexionEnVivo {
  const contexto = useContext(ConexionContext);
  if (contexto === null) {
    throw new Error("useConexionEnVivo debe usarse dentro de <LiveNotificationFeed>");
  }
  return contexto;
}
