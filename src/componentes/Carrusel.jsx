import { useState } from "react";
import { Link } from "react-router-dom";
import { datosDelCurso } from "../datos/cursos.js";
import Chakana from "./Chakana.jsx";

const TECLAS = {
  ArrowLeft: (actual) => actual - 1,
  ArrowRight: (actual) => actual + 1,
  Home: () => 0,
  End: (actual, total) => total - 1,
};

/* Carrusel de cursos adicionales.
   Estado mínimo: UN número, «actual». Todo lo que se ve (qué diapositiva,
   qué punto, el contador, qué botón está apagado) se deriva de él en el
   render, así que texto y estado visual no pueden desincronizarse. */
export default function Carrusel({ cursos, idTitulo }) {
  const [actual, setActual] = useState(0);
  const total = cursos.length;

  // El índice se ACOTA entre 0 y total − 1: Anterior en la primera y
  // Siguiente en la última no producen posiciones inválidas.
  function irA(indice) {
    setActual(Math.min(Math.max(indice, 0), total - 1));
  }

  // Flechas del teclado solo con el foco en los controles o puntos: dentro
  // de una diapositiva su enlace quedaría inerte con el foco encima.
  function alPulsarTecla(evento) {
    if (!evento.target.closest(".carrusel__controles, .carrusel__puntos")) return;
    const destino = TECLAS[evento.key];
    if (!destino) return;
    evento.preventDefault();
    irA(destino(actual, total));
  }

  return (
    <div className="carrusel" role="group" aria-roledescription="carrusel"
         aria-labelledby={idTitulo} onKeyDown={alPulsarTecla}>

      <div className="carrusel__ventana">
        {/* La posición la dibuja el CSS: translateX(calc(--indice * -100%)). */}
        <div className="carrusel__pista" id="carrusel-pista" style={{ "--indice": actual }}>
          {cursos.map((curso, i) => (
            <article
              key={curso.id}
              className="diapositiva"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${total}`}
              inert={i !== actual}
            >
              <div className="diapositiva__arte" aria-hidden="true">
                <Chakana />
              </div>
              <div className="diapositiva__cuerpo">
                <p className="diapositiva__datos">{datosDelCurso(curso)}</p>
                <h3 className="diapositiva__titulo">{curso.titulo}</h3>
                <p className="diapositiva__texto">{curso.texto}</p>
                <Link className="boton boton--secundario boton--flecha" to={`/explorador-cursos?curso=${curso.id}`}>
                  Ver en el catálogo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* aria-disabled y no disabled: el botón sigue enfocable en los
          extremos y quien navega con teclado no pierde el foco. */}
      <div className="carrusel__controles">
        <button type="button" className="carrusel__boton" id="carrusel-anterior" aria-controls="carrusel-pista"
                aria-disabled={actual === 0} onClick={() => irA(actual - 1)}>
          <span aria-hidden="true">←</span> Anterior
        </button>
        <p className="carrusel__contador" aria-live="polite">
          Curso {actual + 1} de {total}: {cursos[actual].titulo}
        </p>
        <button type="button" className="carrusel__boton" id="carrusel-siguiente" aria-controls="carrusel-pista"
                aria-disabled={actual === total - 1} onClick={() => irA(actual + 1)}>
          Siguiente <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="carrusel__puntos">
        {cursos.map((curso, i) => (
          <button
            key={curso.id}
            type="button"
            className="carrusel__punto"
            aria-label={`Curso ${i + 1}: ${curso.titulo}`}
            aria-current={i === actual ? "true" : undefined}
            onClick={() => irA(i)}
          />
        ))}
      </div>

    </div>
  );
}
