import { m, useReducedMotion } from "motion/react";
import { hoverTarjeta, pulsoFavorito, variantesTarjeta } from "../animaciones/tarjeta.ts";
import { CATEGORIAS, NIVELES } from "../datos/cursos.ts";
import type { Experience } from "../types/experience.ts";
import Boton from "./Boton.tsx";
import Chakana from "./Chakana.tsx";

interface ExperienceCardProps {
  item: Experience;
  posicion?: number;
  onSelect?: (id: string) => void;
  esFavorito?: boolean;
  onAlternarFavorito?: (id: string) => void;
}

/* Tarjeta reutilizable de una experiencia: recibe el curso completo por props.
   Las acciones son opcionales: si el padre no pasa la función, el botón no se
   muestra. Entra al llegar a la pantalla y solo una vez; «posicion» decide la
   columna para escalonar la entrada. Con «reducir movimiento» se muestra
   directamente y sin efectos: lo esencial nunca depende de la animación. */
export function ExperienceCard({
  item, posicion = 0, onSelect, esFavorito = false, onAlternarFavorito,
}: ExperienceCardProps) {
  const reducirMovimiento = useReducedMotion();

  return (
    <m.article
      className="curso"
      id={item.id}
      variants={variantesTarjeta}
      custom={posicion % 2}
      initial={reducirMovimiento ? false : "oculta"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={reducirMovimiento ? undefined : hoverTarjeta}
    >
      {/* La imagen es decorativa: lo que informa ya está en el texto. */}
      <div className="curso__portada">
        {item.imagenUrl ? <img src={item.imagenUrl} alt="" loading="lazy" /> : <Chakana />}
      </div>
      <div className="curso__categoria">
        <p>{CATEGORIAS[item.categoria]}</p>
        <p className="curso__valoracion">
          <span aria-hidden="true">★ {item.valoracion.toFixed(1)}/5</span>
          <span className="visualmente-oculto">Valoración: {item.valoracion.toFixed(1)} de 5</span>
        </p>
      </div>
      <h2 className="curso__titulo">{item.titulo}</h2>
      <div className="curso__etiquetas">
        <span className="curso__etiqueta curso__etiqueta--nivel">{NIVELES[item.nivel]}</span>
        <span className="curso__etiqueta">{item.horas} horas</span>
      </div>
      <p className="curso__texto">{item.texto}</p>
      <details className="curso__detalle">
        <summary>Ver temario</summary>
        <ul className="curso__temario">
          {item.temario.map((tema) => <li key={tema}>{tema}</li>)}
        </ul>
      </details>
      {(onSelect || onAlternarFavorito) && (
        <div className="curso__acciones">
          {onSelect && (
            <Boton onClick={() => onSelect(item.id)}>
              Ver experiencia<span className="visualmente-oculto">: {item.titulo}</span>
            </Boton>
          )}
          {onAlternarFavorito && (
            <Boton
              variante={esFavorito ? "primario" : "secundario"}
              aria-pressed={esFavorito}
              onClick={() => onAlternarFavorito(item.id)}
            >
              {/* initial={false}: el pulso responde al clic, no a cada montaje.
                  El estado lo comunican la etiqueta y aria-pressed. */}
              <m.span
                className="curso__estrella"
                aria-hidden="true"
                initial={false}
                animate={esFavorito && !reducirMovimiento ? pulsoFavorito : { scale: 1 }}
              >
                {esFavorito ? "★" : "☆"}
              </m.span>
              {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              <span className="visualmente-oculto">: {item.titulo}</span>
            </Boton>
          )}
        </div>
      )}
    </m.article>
  );
}
