import { CATEGORIAS, NIVELES } from "../datos/cursos.js";

/* Tarjeta del explorador: recibe el curso completo por props. */
export default function TarjetaCurso({ curso }) {
  return (
    <article className="curso">
      <h2 className="curso__titulo">{curso.titulo}</h2>
      <div className="curso__etiquetas">
        <span className="curso__etiqueta">{CATEGORIAS[curso.categoria]}</span>
        <span className="curso__etiqueta">{NIVELES[curso.nivel]}</span>
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
