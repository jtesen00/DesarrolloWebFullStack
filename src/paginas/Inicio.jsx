import { useEffect } from "react";
import Boton from "../componentes/Boton.jsx";
import CifraAnimada from "../componentes/CifraAnimada.jsx";
import Carrusel from "../componentes/Carrusel.jsx";
import CuentaRegresiva from "../componentes/CuentaRegresiva.jsx";
import CursoMosaico from "../componentes/CursoMosaico.jsx";
import ReproductorMuestra from "../componentes/ReproductorMuestra.jsx";
import {
  CATEGORIAS, CURSOS, CURSOS_ADICIONALES, CURSOS_DESTACADOS, PROXIMOS_INICIOS, totalHoras,
} from "../datos/cursos.js";

/* Color de cada tarjeta del mosaico, en el orden del catálogo destacado. */
const TONOS = ["accion", "noche", "claro", "suave", "claro"];

const CIFRAS = [
  { valor: totalHoras(), etiqueta: "horas de clases en vivo" },
  { valor: CURSOS.length, etiqueta: "cursos en el catálogo" },
  { valor: Object.keys(CATEGORIAS).length, etiqueta: "áreas de conocimiento" },
  { valor: 100, sufijo: "%", etiqueta: "con espacio para preguntas" },
];

const PASOS = [
  { titulo: "Explora el catálogo", texto: "Filtra por categoría, nivel y duración, y revisa el temario antes de decidir." },
  { titulo: "Mira una clase gratis", texto: "Una lección real y completa en tu navegador. Sin registro y sin tarjeta." },
  { titulo: "Haz el test del asesor", texto: "Seis preguntas sobre tus intereses y tu tiempo; recibes el curso o la ruta que te conviene." },
];

export default function Inicio() {
  useEffect(() => {
    document.title = "Wayra Academy — Cursos y talleres en línea con instructores peruanos";
  }, []);

  return (
    <main id="contenido">

      <section className="hero" aria-labelledby="titulo-hero">
        <div className="contenedor hero__interior">
          <div>
            <p className="hero__etiqueta">Clases en vivo · Perú</p>
            <h1 className="hero__titulo" id="titulo-hero">
              Domina lo digital con <span className="resalte">quienes lo hacen.</span>
            </h1>
            <p className="hero__texto">
              Cursos y talleres en vivo de desarrollo web, datos, diseño y negocios, dictados por
              profesionales peruanos que trabajan hoy en lo que enseñan.
            </p>
            <div className="hero__acciones">
              <Boton to="/explorador-cursos" flecha grande>Explorar cursos</Boton>
              <Boton to="/clase-muestra" variante="secundario" grande>Ver clase gratis</Boton>
            </div>
          </div>
          <ReproductorMuestra />
        </div>
      </section>

      <section className="seccion--noche" aria-label="Wayra en cifras">
        <ul className="contenedor cifras">
          {CIFRAS.map((cifra) => (
            <li key={cifra.etiqueta}>
              <CifraAnimada valor={cifra.valor} sufijo={cifra.sufijo} />
              <span className="cifra__etiqueta">{cifra.etiqueta}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="catalogo" className="seccion" aria-labelledby="titulo-catalogo">
        <div className="contenedor">
          <div className="seccion__cabecera" data-aparece>
            <div>
              <p className="sobretitulo">// Catálogo</p>
              <h2 className="seccion__titulo" id="titulo-catalogo">Cursos para empezar esta semana</h2>
            </div>
            <Boton to="/explorador-cursos" variante="oscuro" flecha>Ver los {CURSOS.length} cursos</Boton>
          </div>

          <ul className="mosaico" data-aparece>
            {CURSOS_DESTACADOS.map((curso, i) => (
              <CursoMosaico key={curso.id} curso={curso} tono={TONOS[i]} />
            ))}
          </ul>

          <h3 className="seccion__subtitulo" id="titulo-mas-cursos">
            Y {CURSOS_ADICIONALES.length} cursos más
          </h3>
          <div data-aparece>
            <Carrusel cursos={CURSOS_ADICIONALES} idTitulo="titulo-mas-cursos" />
          </div>
        </div>
      </section>

      <section className="seccion seccion--suave" aria-labelledby="titulo-pasos">
        <div className="contenedor">
          <div className="seccion__cabecera" data-aparece>
            <div>
              <p className="sobretitulo">// Cómo empezar</p>
              <h2 className="seccion__titulo" id="titulo-pasos">Prueba antes de inscribirte.</h2>
            </div>
          </div>
          <ol className="pasos" data-aparece>
            {PASOS.map((paso, i) => (
              <li className="paso" key={paso.titulo}>
                <span className="paso__numero" aria-hidden="true">0{i + 1}</span>
                <h3 className="paso__titulo">{paso.titulo}</h3>
                <p className="paso__texto">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="agenda" className="seccion" aria-labelledby="titulo-agenda">
        <div className="contenedor agenda" data-aparece>
          <div>
            <p className="sobretitulo">// Agenda</p>
            <h2 className="seccion__titulo" id="titulo-agenda">Próximos inicios de clases.</h2>
            <CuentaRegresiva inicios={PROXIMOS_INICIOS} />
          </div>
          <ul className="lista-inicios">
            {PROXIMOS_INICIOS.slice(0, 4).map((inicio) => (
              <li className="inicio" key={inicio.cursoId}>
                <div className="inicio__fecha" aria-hidden="true">
                  <span className="inicio__dia">{inicio.dia}</span>
                  <span className="inicio__mes">{inicio.mes}</span>
                </div>
                <div>
                  <h3 className="inicio__titulo">{inicio.curso}</h3>
                  <p className="inicio__hora"><time dateTime={inicio.fecha}>{inicio.texto}</time></p>
                </div>
                <div className="inicio__accion">
                  <a
                    className="boton boton--secundario"
                    href={`mailto:hola@wayraacademy.pe?subject=${encodeURIComponent("Reservar lugar: " + inicio.curso)}`}
                  >
                    Reservar lugar
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seccion--accion" aria-labelledby="titulo-cta">
        <div className="contenedor cta" data-aparece>
          <div>
            <p className="sobretitulo">// Asesor virtual</p>
            <h2 className="cta__titulo" id="titulo-cta">¿No sabes por dónde empezar?</h2>
            <p className="cta__texto">
              Responde seis preguntas y te recomendamos el curso o la ruta ideal para ti.
            </p>
          </div>
          <Boton to="/asesor-virtual" variante="lima" flecha grande>Hacer el test gratis</Boton>
        </div>
      </section>

    </main>
  );
}
