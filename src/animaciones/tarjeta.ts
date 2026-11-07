import type { TargetAndTransition, Variants } from "motion/react";

/* Estados de movimiento del catálogo, en un solo lugar para que todas las
   tarjetas y botones respondan igual. Ninguno comunica información: si se
   quitan, el contenido y los controles siguen completos. */

/* «columna» viene de custom: la columna derecha entra un instante después.
   Depende de la columna y no de la posición en la lista para que las tarjetas
   del final no esperen más que las primeras al llegar a ellas. */
export const variantesTarjeta: Variants = {
  oculta: { opacity: 0, y: 16 },
  visible: (columna: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: columna * 0.06 },
  }),
};

/* Solo desplazamiento: un scale sobre la tarjeta dejaría el texto borroso. */
export const hoverTarjeta: TargetAndTransition = {
  y: -3,
  transition: { type: "spring", stiffness: 320, damping: 24 },
};

export const tapBoton: TargetAndTransition = { scale: 0.97 };

/* Pulso de la estrella al marcar un favorito. */
export const pulsoFavorito: TargetAndTransition = {
  scale: [1, 1.35, 1],
  transition: { duration: 0.28, ease: "easeOut" },
};
