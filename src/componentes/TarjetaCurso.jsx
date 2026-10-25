import { CATEGORIAS, NIVELES } from "../datos/cursos.js";
import Chakana from "./Chakana.jsx";

/* Tarjeta del explorador: recibe el curso completo por props.
   «posicion» alimenta --i, que escalona la animación de entrada: cada tarjeta
   aparece un poco después de la anterior (tope de 8 para que una lista larga
   no tarde en mostrarse). */
export default function TarjetaCurso({ curso, posicion = 0 }) {
  return (
    <article className="curso" id={curso.id} style={{ "--i": Math.min(posicion, 8) }}>
      <p className="curso__categoria">
        {CATEGORIAS[curso.categoria]}
        <Chakana />
      </p>
      <h2 className="curso__titulo">{curso.titulo}</h2>
      <div className="curso__etiquetas">
        <span className="curso__etiqueta curso__etiqueta--nivel">{NIVELES[curso.nivel]}</span>
        <span className="curso__etiqueta">{curso.horas} horas</span>
      </div>
      <p className="curso__texto">{curso.texto}</p>
      <details className="curso__detalle">
        <summary>Ver temario</summary>
        <ul className="curso__temario">
          {curso.temario.map((tema) => <li key={tema}>{tema}</li>)}
        </ul>
      </details>
    </article>
  );
}
