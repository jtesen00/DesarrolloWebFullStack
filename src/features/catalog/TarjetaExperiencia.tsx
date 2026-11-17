import { m, useReducedMotion } from "motion/react";
import { hoverTarjeta, variantesTarjeta } from "../../animaciones/tarjeta.ts";
import Chakana from "../../componentes/Chakana.tsx";
import type { Experience } from "./api.ts";

interface TarjetaExperienciaProps {
  item: Experience;
  posicion?: number;
}

/* La API devuelve los títulos en minúscula. */
function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* Tarjeta de una experiencia remota. Reutiliza el aspecto (.curso) y las
   animaciones de ExperienceCard (semana 9), pero con los campos de la API. */
export function TarjetaExperiencia({ item, posicion = 0 }: TarjetaExperienciaProps) {
  const reducirMovimiento = useReducedMotion();

  return (
    <m.article
      className="curso"
      variants={variantesTarjeta}
      custom={posicion % 2}
      initial={reducirMovimiento ? false : "oculta"}
      animate="visible"
      whileHover={reducirMovimiento ? undefined : hoverTarjeta}
    >
      <div className="curso__portada" aria-hidden="true">
        <Chakana />
      </div>
      <div className="curso__categoria">
        <p>Experiencia n.º {item.id}</p>
        <p>Anfitrión {item.userId}</p>
      </div>
      <h2 className="curso__titulo">{capitalizar(item.title)}</h2>
      <p className="curso__texto">{capitalizar(item.body)}</p>
    </m.article>
  );
}
