import { Link } from "react-router-dom";
import { CATEGORIAS, NIVELES } from "../datos/cursos.js";
import Chakana from "./Chakana.jsx";

/* Tarjeta del mosaico de la portada. Todo el rectángulo es clicable gracias a
   un ::after del enlace del título, sin anidar controles interactivos. */
export default function CursoMosaico({ curso, tono }) {
  return (
    <li className={`curso-mosaico curso-mosaico--${tono}`}>
      <div className="curso-mosaico__arriba">
        <span className="curso-mosaico__categoria">{CATEGORIAS[curso.categoria]}</span>
        <Chakana className="curso-mosaico__chakana" />
      </div>
      <div>
        <h3 className="curso-mosaico__titulo">
          <Link to={`/explorador-cursos?curso=${curso.id}`}>{curso.titulo}</Link>
        </h3>
        <p className="curso-mosaico__datos">{NIVELES[curso.nivel]} · {curso.horas} h</p>
      </div>
    </li>
  );
}
