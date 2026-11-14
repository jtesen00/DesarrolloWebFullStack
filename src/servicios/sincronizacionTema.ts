import { useEffect } from "react";
import { useAppStore } from "../store/appStore.ts";
import type { Theme } from "../store/appStore.ts";

/* Sincroniza el tema entre pestañas del mismo navegador con BroadcastChannel.
   localStorage guarda la preferencia, pero las otras pestañas abiertas no se
   enteran solas: hay que avisarles. Esto NO sincroniza usuarios en equipos
   distintos; para eso está el servidor WebSocket. */

const NOMBRE_CANAL = "experiencias-sync";

type MensajeSync = { type: "THEME_CHANGED"; theme: Theme };

let canal: BroadcastChannel | null = null;

function esMensajeTema(dato: unknown): dato is MensajeSync {
  const d = dato as Partial<MensajeSync> | null;
  return d?.type === "THEME_CHANGED" && (d.theme === "light" || d.theme === "dark");
}

/* Cambia el tema en esta pestaña (con fundido si se puede) y avisa a las
   demás. Es la única forma de cambiar el tema desde la interfaz. */
export function cambiarTema(theme: Theme): void {
  const aplicar = () => useAppStore.getState().setTheme(theme);

  // View Transitions: el navegador fotografía la página, aplica el cambio y
  // funde las dos. Sin soporte o con «reducir movimiento», cambio directo.
  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !sinMovimiento) document.startViewTransition(aplicar);
  else aplicar();

  canal?.postMessage({ type: "THEME_CHANGED", theme } satisfies MensajeSync);
}

/* Abre el canal mientras el componente propietario esté montado y lo cierra
   al desmontar. Se usa una sola vez, en App. Al recibir un cambio solo se
   actualiza el store: no se reenvía, así no hay eco infinito. */
export function useSincronizacionTema(): void {
  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const propio = new BroadcastChannel(NOMBRE_CANAL);
    canal = propio;
    propio.onmessage = (evento: MessageEvent<unknown>) => {
      if (esMensajeTema(evento.data)) useAppStore.getState().setTheme(evento.data.theme);
    };
    return () => {
      propio.close();
      if (canal === propio) canal = null;
    };
  }, []);
}
