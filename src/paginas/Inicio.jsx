import { useEffect } from "react";
import Boton from "../componentes/Boton.jsx";
import Saludo from "../componentes/Saludo.jsx";
import TarjetaExperiencia from "../componentes/TarjetaExperiencia.jsx";
import Carrusel from "../componentes/Carrusel.jsx";
import BloqueLateral from "../componentes/BloqueLateral.jsx";
import ListaLateral from "../componentes/ListaLateral.jsx";
import CuentaRegresiva from "../componentes/CuentaRegresiva.jsx";
import { CURSOS, PROXIMOS_INICIOS } from "../datos/cursos.js";

const EXPERIENCIAS = [
  {
    id: "exp-1",
    imagen: "/img/explorador-cursos.svg",
    alt: "Buscador de cursos con los filtros de categoría, nivel y duración activos, mostrando cinco cursos comparables con su temario.",
    titulo: "Explorador interactivo de cursos",
    texto: "Filtra por categoría, nivel y duración, compara cursos lado a lado y revisa una vista previa del temario antes de decidir.",
    destino: "/explorador-cursos",
    accion: "Explorar cursos",
  },
  {
    id: "exp-2",
    imagen: "/img/clase-muestra.svg",
    alt: "Miniatura de una clase muestra en video, con el control de reproducción y la duración de la lección visibles.",
    titulo: "Clases muestra en video",
    texto: "Una lección real y completa de un curso del catálogo. Se reproduce en el navegador, sin registro y sin tarjeta, para que compruebes cómo se enseña.",
    destino: "/clase-muestra",
    accion: "Ver clase gratis",
  },
  {
    id: "exp-3",
    imagen: "/img/asesor-virtual.svg",
    alt: "Pantalla del test de asesor virtual con una pregunta sobre intereses y cuatro opciones de respuesta.",
    titulo: "Asesor virtual de ruta de aprendizaje",
    texto: "Seis preguntas sobre tus intereses, tu tiempo disponible y tu objetivo. Al terminar recibes el curso o la ruta de capacitación que te conviene seguir.",
    destino: "/asesor-virtual",
    accion: "Hacer el test",
  },
];

const VENTAJAS = [
  { dato: "Instructores verificados", apunte: "Cada uno pasa por una revisión de experiencia y de materiales antes de publicar." },
  { dato: "Clases en vivo, no grabaciones", apunte: "Con espacio para preguntas y revisión de tus ejercicios." },
  { dato: "Certificado verificable", apunte: "Con código de validación en línea al terminar el curso." },
];

const FECHAS = PROXIMOS_INICIOS.map((inicio) => ({ dato: inicio.curso, apunte: inicio.texto }));

export default function Inicio() {
  useEffect(() => {
    document.title = "Wayra Academy — Cursos y talleres en línea con instructores peruanos";
  }, []);

  return (
    <>
      <main id="contenido" className="principal">

        <div className="bienvenida">
          <Saludo nombre="futuro estudiante" mensaje="Te damos la bienvenida a Wayra Academy." />
          <h1 className="bienvenida__titulo">Aprende con instructores peruanos verificados</h1>
          <p className="bienvenida__texto">
            Cursos y talleres en vivo dictados por profesionales que trabajan hoy en lo que enseñan.
            Cada instructor pasa por una revisión de experiencia y de sus materiales antes de publicar.
          </p>
          <Boton href="#experiencias">Ver cursos disponibles</Boton>
        </div>

        <section id="experiencias" className="experiencias" aria-labelledby="titulo-experiencias">
          <h2 id="titulo-experiencias" className="experiencias__titulo">Experiencias interactivas</h2>
          <p className="experiencias__bajada">Tres formas de conocer la plataforma antes de inscribirte.</p>

          <div className="experiencias__grilla">
            {EXPERIENCIAS.map((experiencia) => (
              <TarjetaExperiencia key={experiencia.id} {...experiencia} />
            ))}
          </div>
        </section>

        <section id="destacados" className="destacados" aria-labelledby="titulo-destacados">
          <h2 id="titulo-destacados" className="destacados__titulo">Cursos destacados</h2>
          <p className="destacados__bajada">Los cinco cursos del catálogo, uno a la vez. Usa los botones o las flechas del teclado.</p>
          <Carrusel cursos={CURSOS} />
        </section>

      </main>

      <aside className="lateral" aria-label="Información complementaria">
        <BloqueLateral titulo="Próximo inicio de clases">
          <CuentaRegresiva inicios={PROXIMOS_INICIOS} />
        </BloqueLateral>

        <BloqueLateral titulo="Próximas fechas de inicio">
          <ListaLateral elementos={FECHAS} />
        </BloqueLateral>

        <BloqueLateral titulo="Por qué Wayra Academy">
          <ListaLateral elementos={VENTAJAS} />
        </BloqueLateral>
      </aside>
    </>
  );
}
