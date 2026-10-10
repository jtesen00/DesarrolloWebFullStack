import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CabeceraPagina from "../componentes/CabeceraPagina.jsx";
import BloqueLateral from "../componentes/BloqueLateral.jsx";
import ListaLateral from "../componentes/ListaLateral.jsx";
import TarjetaCurso from "../componentes/TarjetaCurso.jsx";
import { CURSOS } from "../datos/cursos.js";
import { useCargaSimulada } from "../hooks/useCargaSimulada.js";

/* Consejos para el bloque lateral complementario. */
const CONSEJOS = [
  {
    dato: "Empieza por el nivel, no por el tema",
    apunte: "Un curso avanzado del área que te gusta rinde menos que uno inicial bien elegido.",
  },
  {
    dato: "Revisa el temario antes de decidir",
    apunte: "Cada curso abre su temario completo con «Ver temario».",
  },
  {
    dato: "Calcula tu tiempo real por semana",
    apunte: "Un curso de 30 horas pide unas 4 horas semanales durante dos meses.",
  },
];

/* Tramos de duración unificados para mantener la misma regla que en vanilla JS. */
const RANGOS = {
  corta: (horas) => horas < 10,
  media: (horas) => horas >= 10 && horas <= 30,
  larga: (horas) => horas > 30,
};

/* Pasa a minúsculas y quita las tildes para que "diseno" encuentre "Diseño". */
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* Evalúa si un curso cumple simultáneamente con todos los filtros activos. */
function coincide(curso, filtros) {
  if (filtros.categoria !== "todas" && curso.categoria !== filtros.categoria) {
    return false;
  }
  if (filtros.nivel !== "todos" && curso.nivel !== filtros.nivel) {
    return false;
  }
  if (filtros.duracion !== "cualquiera") {
    const horas = Number(curso.horas);
    if (!RANGOS[filtros.duracion](horas)) return false;
  }
  if (filtros.busqueda !== "") {
    const titulo = normalizar(curso.titulo);
    if (!titulo.includes(filtros.busqueda)) return false;
  }
  return true;
}

export default function ExploradorCursos() {
  const [categoria, setCategoria] = useState("todas");
  const [nivel, setNivel] = useState("todos");
  const [duracion, setDuracion] = useState("cualquiera");
  const [busqueda, setBusqueda] = useState("");

  // useRef guarda el <input> para devolverle el foco al limpiar: sin él, el foco se perdería
  // porque el botón "Limpiar búsqueda" desaparece al vaciarse el campo.
  const inputBusqueda = useRef(null);

  // useCargaSimulada mantiene la referencia estática de CURSOS para no reejecutar el efecto.
  const { cargando, datos: cursos } = useCargaSimulada(CURSOS);

  const filtros = {
    categoria,
    nivel,
    duracion,
    busqueda: normalizar(busqueda.trim()),
  };

  function limpiarBusqueda() {
    setBusqueda("");
    inputBusqueda.current.focus();
  }

  // Se calculan los cursos visibles derivando el estado sin duplicar datos.
  const cursosFiltrados = cursos.filter((curso) => coincide(curso, filtros));

  let textoResultados = "";
  if (cargando) {
    textoResultados = "Cargando cursos…";
  } else if (cursosFiltrados.length === 0) {
    textoResultados = "Ningún curso coincide con estos filtros. Prueba a quitar alguno.";
  } else if (cursosFiltrados.length === 1) {
    textoResultados = "1 curso coincide";
  } else {
    textoResultados = `${cursosFiltrados.length} cursos coinciden`;
  }

  const esVacio = !cargando && cursosFiltrados.length === 0;

  return (
    <>
      <main id="contenido" className="pagina">
        <CabeceraPagina titulo="Explorador interactivo de cursos">
          Filtra por categoría, nivel y duración, o busca por nombre: la lista se actualiza mientras
          eliges, sin recargar la página. También puedes abrir el temario completo de cada curso.
        </CabeceraPagina>

        <div className="filtros">
          <div className={`filtros__campo${categoria !== "todas" ? " filtros__campo--activo" : ""}`}>
            <label htmlFor="filtro-categoria">Categoría</label>
            <select
              id="filtro-categoria"
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="todas">Todas las categorías</option>
              <option value="desarrollo-web">Desarrollo web</option>
              <option value="datos-ia">Datos e IA</option>
              <option value="diseno">Diseño</option>
              <option value="negocios">Negocios digitales</option>
            </select>
          </div>

          <div className={`filtros__campo${nivel !== "todos" ? " filtros__campo--activo" : ""}`}>
            <label htmlFor="filtro-nivel">Nivel</label>
            <select
              id="filtro-nivel"
              value={nivel}
              onChange={(evento) => setNivel(evento.target.value)}
            >
              <option value="todos">Todos los niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          <div className={`filtros__campo${duracion !== "cualquiera" ? " filtros__campo--activo" : ""}`}>
            <label htmlFor="filtro-duracion">Duración</label>
            <select
              id="filtro-duracion"
              value={duracion}
              onChange={(evento) => setDuracion(evento.target.value)}
            >
              <option value="cualquiera">Cualquier duración</option>
              <option value="corta">Menos de 10 horas</option>
              <option value="media">10 a 30 horas</option>
              <option value="larga">Más de 30 horas</option>
            </select>
          </div>

          <div className={`filtros__campo${busqueda.trim() !== "" ? " filtros__campo--activo" : ""}`}>
            <label htmlFor="busqueda-curso">Buscar por nombre</label>
            <input
              ref={inputBusqueda}
              type="search"
              id="busqueda-curso"
              placeholder="Por ejemplo: React"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
            {busqueda !== "" && (
              <button type="button" className="boton boton--secundario" onClick={limpiarBusqueda}>
                Limpiar búsqueda
              </button>
            )}
          </div>
        </div>

        <p
          className={`resultados${esVacio ? " resultados--vacio" : ""}`}
          id="aviso-resultados"
          role="status"
        >
          {textoResultados}
        </p>

        <div className="cursos__grilla">
          {cargando
            ? [1, 2, 3].map((posicion) => (
                <div key={posicion} className="curso curso--cargando" aria-hidden="true">
                  <span className="curso__esqueleto"></span>
                  <span className="curso__esqueleto"></span>
                  <span className="curso__esqueleto"></span>
                </div>
              ))
            : cursosFiltrados.map((curso) => (
                <TarjetaCurso key={curso.id} curso={curso} />
              ))}
        </div>
      </main>

      <aside className="lateral" aria-label="Ayuda para elegir tu curso">
        <BloqueLateral titulo="Cómo elegir tu curso">
          <ListaLateral elementos={CONSEJOS} />
        </BloqueLateral>

        <BloqueLateral titulo="Sobre las certificaciones">
          <p className="lateral__texto">
            Todos los cursos entregan constancia de horas. Los marcados como{" "}
            <strong>certificado verificable</strong> incluyen además un código de validación en línea
            que puedes compartir con un empleador.
          </p>
        </BloqueLateral>

        <BloqueLateral titulo="¿Todavía con dudas?">
          <p className="lateral__texto">
            Prueba el <Link to="/asesor-virtual">asesor virtual</Link>: seis preguntas y te sugiere una ruta.
            O mira una <Link to="/clase-muestra">clase muestra gratis</Link>.
          </p>
        </BloqueLateral>
      </aside>
    </>
  );
}
