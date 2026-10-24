import { useEffect } from "react";
import { Link } from "react-router-dom";

/* Cabecera de las páginas internas: ruta de migas, <h1> e intro.
   También pone el título de la pestaña, que antes iba en cada <head>. */
export default function CabeceraPagina({ titulo, miga, children }) {
  useEffect(() => {
    document.title = `${titulo} — Wayra Academy`;
  }, [titulo]);

  return (
    <header className="cabecera-pagina">
      <p className="sobretitulo">
        <Link to="/">Inicio</Link> / {miga ?? titulo}
      </p>
      <h1 className="cabecera-pagina__titulo">{titulo}</h1>
      <p className="cabecera-pagina__intro">{children}</p>
    </header>
  );
}
