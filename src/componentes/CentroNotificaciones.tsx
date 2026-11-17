import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { selectUnreadCount, useAppStore } from "../store/appStore.ts";
import NotificationPanel from "./NotificationPanel.tsx";

/* Campana del encabezado: muestra el contador de no leídas y abre el panel.
   Patrón de divulgación: aria-expanded en el botón y el panel justo después
   en el orden de tabulación. Escape o un clic fuera lo cierran. */
export default function CentroNotificaciones() {
  const unreadCount = useAppStore(selectUnreadCount);
  const [abierto, setAbierto] = useState(false);
  const reducirMovimiento = useReducedMotion();
  const contenedorRef = useRef<HTMLDivElement>(null);
  const botonRef = useRef<HTMLButtonElement>(null);
  const idPanel = useId();

  useEffect(() => {
    if (!abierto) return;

    function alPulsarTecla(evento: KeyboardEvent) {
      if (evento.key !== "Escape") return;
      setAbierto(false);
      botonRef.current?.focus();
    }
    function alPulsarFuera(evento: PointerEvent) {
      if (!contenedorRef.current?.contains(evento.target as Node)) setAbierto(false);
    }

    document.addEventListener("keydown", alPulsarTecla);
    document.addEventListener("pointerdown", alPulsarFuera);
    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
      document.removeEventListener("pointerdown", alPulsarFuera);
    };
  }, [abierto]);

  const etiqueta = unreadCount === 0
    ? "Notificaciones"
    : `Notificaciones: ${unreadCount} sin leer`;

  return (
    <div className="notificaciones" ref={contenedorRef}>
      <button
        ref={botonRef}
        type="button"
        className="notificaciones__boton"
        aria-label={etiqueta}
        aria-expanded={abierto}
        aria-controls={abierto ? idPanel : undefined}
        onClick={() => setAbierto((valor) => !valor)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
        <AnimatePresence>
          {unreadCount > 0 && (
            <m.span
              key={unreadCount}
              className="notificaciones__contador"
              aria-hidden="true"
              initial={reducirMovimiento ? false : { scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </m.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {abierto && (
          <m.div
            className="notificaciones__capa"
            initial={reducirMovimiento ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducirMovimiento ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <NotificationPanel id={idPanel} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
