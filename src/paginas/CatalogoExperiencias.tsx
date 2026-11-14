import { useEffect, useId, useRef, useState } from "react";
import CabeceraPagina from "../componentes/CabeceraPagina.tsx";
import { TarjetaExperiencia } from "../features/catalog/TarjetaExperiencia.tsx";
import { useExperiences } from "../features/catalog/useExperiences.ts";
import { EXPERIENCES_PER_PAGE } from "../features/catalog/api.ts";

const formatoHora = new Intl.DateTimeFormat("es-PE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });

/* Catálogo de experiencias de la comunidad (semana 11, Desarrollo Web).
   Los datos vienen de la API con TanStack Query; aquí solo hay estado de
   interfaz: la página elegida y el interruptor de la prueba de error. */
export default function CatalogoExperiencias() {
  const [page, setPage] = useState(1);
  const [simularError, setSimularError] = useState(false);
  const { data, isPending, isError, error, isFetching, isStale, dataUpdatedAt, refetch } = useExperiences(page, simularError);

  // El total de páginas llega con la primera respuesta. Se recuerda para que
  // la paginación no parpadee mientras carga una página nueva.
  const [totalPaginas, setTotalPaginas] = useState<number | null>(null);
  useEffect(() => {
    if (data) setTotalPaginas(data.totalPages);
  }, [data]);

  const anteriorRef = useRef<HTMLButtonElement>(null);
  const siguienteRef = useRef<HTMLButtonElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);
  const idSimular = useId();

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
  if (isPending) textoEstado = `Cargando experiencias de la página ${page}…`;
  else if (data) textoEstado = `Página ${page} de ${data.totalPages} · ${data.items.length} experiencias de ${data.total}`;

  let textoCache = "";
  if (data) {
    const hora = formatoHora.format(dataUpdatedAt);
    if (isFetching) textoCache = `Datos de las ${hora} · actualizando desde la API…`;
    else if (isStale) textoCache = `Datos de las ${hora} · vencidos: se volverán a pedir al visitar la página`;
    else textoCache = `Datos de las ${hora} · frescos: se reutilizan desde la caché`;
  }

  return (
    <main id="contenido" className="contenedor">
      <CabeceraPagina titulo="Catálogo de experiencias" miga="Experiencias">
        Experiencias compartidas por la comunidad, cargadas en vivo desde una API pública.
        Cambia de página para ver más: las páginas que ya visitaste se muestran al instante.
      </CabeceraPagina>

      <div className="resultados-barra catalogo__barra" ref={barraRef}>
        <p className="resultados" role="status">{textoEstado}</p>
        {textoCache && <p className="catalogo__cache">{textoCache}</p>}
      </div>

      {isError ? (
        <div className="catalogo__error" role="alert">
          <p>
            <strong>No pudimos cargar el catálogo.</strong> {error.message} Revisa tu conexión e inténtalo de nuevo.
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
          Página <strong>{page}</strong>{totalPaginas !== null && <> de {totalPaginas}</>}
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

      <details className="catalogo__pruebas">
        <summary>Pruebas de caché y errores</summary>
        <p>
          La caché guarda cada página 60 segundos como «fresca». Visita la página 1, luego la 2 y vuelve
          a la 1: aparece sin indicador de carga y con la misma hora de obtención. La caché vive en la
          memoria de esta pestaña; al recargar se pierde y los datos se vuelven a pedir.
        </p>
        <label htmlFor={idSimular} className="catalogo__interruptor">
          <input
            id={idSimular}
            type="checkbox"
            checked={simularError}
            onChange={(e) => setSimularError(e.target.checked)}
          />
          Simular URL inválida (la API responde 404)
        </label>
      </details>
    </main>
  );
}
