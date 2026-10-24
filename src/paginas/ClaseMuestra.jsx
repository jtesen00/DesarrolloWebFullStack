import BloqueLateral from "../componentes/BloqueLateral.jsx";
import Boton from "../componentes/Boton.jsx";
import CabeceraPagina from "../componentes/CabeceraPagina.jsx";
import ListaLateral from "../componentes/ListaLateral.jsx";
import Monitor from "../componentes/Monitor.jsx";

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
    <div className="contenedor disposicion">
      {/* display: contents en <main> deja que su cabecera y su contenido
          ocupen áreas distintas del Grid sin perder el landmark. */}
      <main id="contenido" className="pagina pagina--en-rejilla">
        <CabeceraPagina titulo="Clases muestra en video" miga="Clases muestra">
          Una lección real y completa de un curso del catálogo. Se reproduce aquí mismo, en el
          navegador, sin registro y sin tarjeta, para que compruebes cómo se enseña.
        </CabeceraPagina>

        <div className="pagina__contenido">
          <div className="video-marco">
            <video controls poster="/img/clase-muestra.svg" width="800" height="500" preload="metadata">
              <source src="/media/clase-muestra.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video. Puedes{" "}
              <a href="/media/clase-muestra.mp4">descargarlo directamente</a>.
            </video>
          </div>

          <div className="leccion-info">
            <p className="leccion-info__curso">Frontend con HTML5, CSS3 y JavaScript</p>
            <h2 className="leccion-info__titulo">Clase 1: Semántica</h2>
            <p className="leccion-info__meta">Duración: 12 min · Instructor: equipo docente de Wayra Academy</p>
          </div>
        </div>
      </main>

      <aside className="lateral" aria-label="Sobre esta clase">
        <BloqueLateral titulo="Contenido de esta clase">
          <ListaLateral elementos={CONTENIDO} numerada />
        </BloqueLateral>

        <BloqueLateral titulo="Otras clases muestra">
          <ListaLateral elementos={OTRAS_CLASES} />
        </BloqueLateral>

        <BloqueLateral titulo="Tu tiempo de estudio">
          <Monitor />
        </BloqueLateral>

        <BloqueLateral titulo="¿Te sirvió la clase?" tono="accion">
          <p className="lateral__texto">
            Revisa el curso completo o descubre tu ruta con el asesor virtual.
          </p>
          <Boton to="/asesor-virtual" variante="lima" flecha>Hacer el test</Boton>
        </BloqueLateral>
      </aside>
    </div>
  );
}
