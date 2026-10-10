import { useEffect } from "react";
import { Link } from "react-router-dom";

/* Cabecera de las páginas internas: enlace de vuelta, <h1> e intro.
   También pone el título de la pestaña, que antes iba en cada <head>. */
export default function CabeceraPagina({ titulo, children }) {
  useEffect(() => {
    document.title = `${titulo} — Wayra Academy`;
  }, [titulo]);

  return (
    <>
      <Link className="pagina__volver" to="/">← Volver a Wayra Academy</Link>
      <div className="pagina__cabecera">
        <h1 className="pagina__titulo">{titulo}</h1>
        <p className="pagina__intro">{children}</p>
      </div>
    </>
  );
}
