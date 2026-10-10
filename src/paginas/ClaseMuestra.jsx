import { Link } from "react-router-dom";
import CabeceraPagina from "../componentes/CabeceraPagina.jsx";
import BloqueLateral from "../componentes/BloqueLateral.jsx";
import ListaLateral from "../componentes/ListaLateral.jsx";

const CONTENIDO = [
  { dato: "Qué significa «semántica»", apunte: "Por qué el navegador y el lector de pantalla no leen lo mismo." },
  { dato: "Las regiones de una página", apunte: "header, nav, main, aside y footer, y cuándo corresponde cada uno." },
  { dato: "section frente a article", apunte: "La pregunta de «¿esto se sostiene solo?»." },
  { dato: "Ejercicio guiado", apunte: "Convertir una página de puros div en una con regiones reales." },
];

const OTRAS_CLASES = [
  { dato: "React desde cero — Clase 1", apunte: "Qué es un componente. Próximamente." },
  { dato: "Análisis de datos — Clase 1", apunte: "Leer un dataset sin morir en el intento. Próximamente." },
];

export default function ClaseMuestra() {
  return (
    <>
      <main id="contenido" className="pagina">
        <CabeceraPagina titulo="Clases muestra en video">
          Una lección real y completa de un curso del catálogo. Se reproduce aquí mismo, en el
          navegador, sin registro y sin tarjeta, para que compruebes cómo se enseña.
        </CabeceraPagina>

        <div className="video-marco">
          <video controls poster="/img/clase-muestra.svg" width="800" height="500">
            <source src="/media/clase-muestra.mp4" type="video/mp4" />
            Tu navegador no puede reproducir este video. Puedes{" "}
            <a href="/media/clase-muestra.mp4">descargarlo directamente</a>.
          </video>
        </div>

        <div className="leccion-info">
          <h2 className="leccion-info__titulo">Frontend con HTML5, CSS3 y JavaScript — Clase 1: Semántica</h2>
          <p className="leccion-info__meta">Duración: 12 min · Instructor: equipo docente de Wayra Academy</p>
        </div>
      </main>

      <aside className="lateral" aria-label="Sobre esta clase">
        <BloqueLateral titulo="Contenido de esta clase">
          <ListaLateral elementos={CONTENIDO} />
        </BloqueLateral>

        <BloqueLateral titulo="Otras clases muestra">
          <ListaLateral elementos={OTRAS_CLASES} />
        </BloqueLateral>

        <BloqueLateral titulo="¿Te sirvió la clase?">
          <p className="lateral__texto">
            Revisa el <Link to="/explorador-cursos">curso completo</Link> o descubre tu ruta con
            el <Link to="/asesor-virtual">asesor virtual</Link>.
          </p>
        </BloqueLateral>
      </aside>
    </>
  );
}
