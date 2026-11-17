import { useEffect, useRef, useState } from "react";
import CabeceraPagina from "../componentes/CabeceraPagina.tsx";
import { TarjetaExperiencia } from "../features/catalog/TarjetaExperiencia.tsx";
import { useExperiences } from "../features/catalog/useExperiences.ts";
import { EXPERIENCES_PER_PAGE } from "../features/catalog/api.ts";

/* Catálogo de experiencias de la comunidad (semana 11, Desarrollo Web).
   Los datos vienen de la API con TanStack Query; aquí solo hay estado de
   interfaz: la página elegida. La caché y los errores se demuestran con las
   Devtools de TanStack Query y la pestaña Network, no en la interfaz. */
export default function CatalogoExperiencias() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error, isFetching, refetch } = useExperiences(page);

  // El total de páginas llega con la primera respuesta. Se recuerda para que
  // la paginación no parpadee mientras carga una página nueva.
  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);
  useEffect(() => {
    if (data) setTotalPaginas(data.totalPages);
  }, [data]);

  // Al usuario se le habla en lenguaje simple; el detalle técnico (código
  // HTTP, falta de red) queda en la consola para quien depura.
  useEffect(() => {
    if (isError) console.error("Catálogo de experiencias:", error.message);
  }, [isError, error]);

  const anteriorRef = useRef<HTMLButtonElement>(null);
  const siguienteRef = useRef<HTMLButtonElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);

  const esPrimera = page === 1;
  const esUltima = totalPaginas !== null && page >= totalPaginas;

  function irA(nueva: number) {
    setPage(nueva);
    // Un botón deshabilitado pierde el foco y el teclado quedaría en <body>:
    // se pasa al otro botón de la paginación.
    if (nueva === 1) siguienteRef.current?.focus();
    else if (totalPaginas !== null && nueva >= totalPaginas) anteriorRef.current?.focus();
    // Si la lista empieza fuera de la pantalla, se sube hasta ella.
    const barra = barraRef.current;
    if (barra && barra.getBoundingClientRect().top < 0) {
      const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      barra.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
    }
  }

  let textoEstado = "";
  if (isPending) {
    textoEstado = "Cargando experiencias…";
  } else if (data) {
    const desde = (page - 1) * EXPERIENCES_PER_PAGE + 1;
    const hasta = desde + data.items.length - 1;
    textoEstado = `Mostrando ${desde}–${hasta} de ${data.total} experiencias`;
  }

  return (
    <main id="contenido" className="contenedor">
      <CabeceraPagina titulo="Catálogo de experiencias" miga="Experiencias">
        Ideas, proyectos y aprendizajes que comparte la comunidad de Wayra Academy.
        Explora las publicaciones más recientes y descubre en qué están trabajando otros estudiantes.
      </CabeceraPagina>

      <div className="resultados-barra catalogo__barra" ref={barraRef}>
        <p className="resultados" role="status">{textoEstado}</p>
      </div>

      {isError ? (
        <div className="catalogo__error" role="alert">
          <p>
            <strong>No pudimos cargar las experiencias.</strong> Revisa tu conexión a internet e inténtalo de nuevo.
          </p>
          <button type="button" className="boton boton--primario" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Reintentando…" : "Reintentar"}
          </button>
        </div>
      ) : (
        <div className="cursos__grilla catalogo__grilla" aria-busy={isPending}>
          {isPending
            ? Array.from({ length: EXPERIENCES_PER_PAGE }, (_, i) => (
                <div key={i} className="curso curso--cargando" aria-hidden="true">
                  <span className="curso__esqueleto"></span>
                  <span className="curso__esqueleto"></span>
                  <span className="curso__esqueleto"></span>
                </div>
              ))
            : data.items.map((item, posicion) => (
                <TarjetaExperiencia key={item.id} item={item} posicion={posicion} />
              ))}
        </div>
      )}

      {/* Sin total conocido (primera carga, o falló antes de recibir datos)
          no se sabe si hay más páginas: la paginación espera a la primera
          respuesta. */}
      {totalPaginas !== null && (
        <nav className="paginacion" aria-label="Paginación del catálogo">
          <button
            ref={anteriorRef}
            type="button"
            className="boton boton--secundario"
            onClick={() => irA(page - 1)}
            disabled={esPrimera}
          >
            <span aria-hidden="true">←</span> Anterior
          </button>
          <p className="paginacion__actual">
            Página <strong>{page}</strong> de {totalPaginas}
          </p>
          <button
            ref={siguienteRef}
            type="button"
            className="boton boton--secundario"
            onClick={() => irA(page + 1)}
            disabled={esUltima}
          >
            Siguiente <span aria-hidden="true">→</span>
          </button>
        </nav>
      )}
    </main>
  );
}
