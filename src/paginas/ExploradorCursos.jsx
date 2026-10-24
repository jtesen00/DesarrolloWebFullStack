import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CabeceraPagina from "../componentes/CabeceraPagina.jsx";
import TarjetaCurso from "../componentes/TarjetaCurso.jsx";
import Boton from "../componentes/Boton.jsx";
import { CURSOS } from "../datos/cursos.js";
import { useCargaSimulada } from "../hooks/useCargaSimulada.js";

/* Tramos de duración unificados para mantener la misma regla que en vanilla JS. */
const RANGOS = {
  corta: (horas) => horas < 10,
  media: (horas) => horas >= 10 && horas <= 30,
  larga: (horas) => horas > 30,
};

/* Pasa a minúsculas y quita las tildes para que "diseno" encuentre "Diseño". */
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
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

  // Los enlaces de la portada llegan con ?curso=id: al cargar la lista se
  // abre y se muestra ese curso.
  const [parametros] = useSearchParams();
  const cursoPedido = parametros.get("curso");

  // useRef guarda el <input> para devolverle el foco al limpiar: sin él, el foco se perdería
  // porque el botón "Limpiar filtros" desaparece al volver todo a su valor inicial.
  const inputBusqueda = useRef(null);

  // useCargaSimulada mantiene la referencia estática de CURSOS para no reejecutar el efecto.
  const { cargando, datos: cursos } = useCargaSimulada(CURSOS);

  const filtros = {
    categoria,
    nivel,
    duracion,
    busqueda: normalizar(busqueda.trim()),
  };

  const hayFiltros =
    categoria !== "todas" || nivel !== "todos" || duracion !== "cualquiera" || busqueda.trim() !== "";

  function limpiarFiltros() {
    setCategoria("todas");
    setNivel("todos");
    setDuracion("cualquiera");
    setBusqueda("");
    inputBusqueda.current.focus();
  }

  useEffect(() => {
    if (cargando || !cursoPedido) return;
    const tarjeta = document.getElementById(cursoPedido);
    if (!tarjeta) return;
    tarjeta.querySelector("details")?.setAttribute("open", "");
    tarjeta.scrollIntoView({ block: "center" });
  }, [cargando, cursoPedido]);

  // Se calculan los cursos visibles derivando el estado sin duplicar datos.
  const cursosFiltrados = cursos.filter((curso) => coincide(curso, filtros));

  let textoResultados = "";
  if (cargando) {
    textoResultados = "Cargando cursos…";
  } else if (cursosFiltrados.length === 0) {
    textoResultados = "Ningún curso coincide con estos filtros. Prueba a quitar alguno.";
  } else if (cursosFiltrados.length === 1) {
    textoResultados = `Mostrando 1 de ${cursos.length} cursos`;
  } else {
    textoResultados = `Mostrando ${cursosFiltrados.length} de ${cursos.length} cursos`;
  }

  const esVacio = !cargando && cursosFiltrados.length === 0;

  return (
    <main id="contenido" className="contenedor">
      <CabeceraPagina titulo="Explorador interactivo de cursos" miga="Explorador de cursos">
        Filtra por categoría, nivel y duración, o busca por nombre: la lista se actualiza mientras
        eliges, sin recargar la página. También puedes abrir el temario completo de cada curso.
      </CabeceraPagina>

      <div className="filtros">
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
        </div>

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
      </div>

      <div className="resultados-barra">
        <p
          className={`resultados${esVacio ? " resultados--vacio" : ""}`}
          id="aviso-resultados"
          role="status"
        >
          {textoResultados}
        </p>
        {hayFiltros && (
          <Boton variante="secundario" onClick={limpiarFiltros}>Limpiar filtros</Boton>
        )}
      </div>

      <div className="cursos__grilla">
        {cargando
          ? [1, 2, 3, 4].map((posicion) => (
              <div key={posicion} className="curso curso--cargando" aria-hidden="true">
                <span className="curso__esqueleto"></span>
                <span className="curso__esqueleto"></span>
                <span className="curso__esqueleto"></span>
              </div>
            ))
          : cursosFiltrados.map((curso, posicion) => (
              <TarjetaCurso key={curso.id} curso={curso} posicion={posicion} />
            ))}
      </div>
    </main>
  );
}
