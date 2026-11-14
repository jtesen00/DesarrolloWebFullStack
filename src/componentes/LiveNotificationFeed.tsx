import { useExperienceSocket } from "../hooks/useExperienceSocket.ts";

/* Monta el cliente WebSocket una sola vez, cerca de la raíz (App). No dibuja
   nada: los eventos van al store Zustand y la campana, el panel y el aviso
   los leen de ahí. Desde la semana 11 ya no necesita envolver a la
   aplicación con un Context: el envío lo hace servicios/socketExperiencias. */
export function LiveNotificationFeed() {
  useExperienceSocket();
  return null;
}
