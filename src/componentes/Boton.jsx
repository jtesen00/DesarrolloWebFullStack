import { Link } from "react-router-dom";

/* Componente reutilizable: el mismo aspecto (.boton) para tres casos.
   · to      → navegación dentro de la aplicación (<Link>, sin recargar).
   · href    → ancla de la misma página o enlace externo (<a>).
   · onClick → acción en esta misma página (<button>). */
export default function Boton({ variante = "primario", to, href, onClick, type = "button", children }) {
  const clase = `boton boton--${variante}`;

  if (to) return <Link className={clase} to={to}>{children}</Link>;
  if (href) return <a className={clase} href={href}>{children}</a>;
  return <button type={type} className={clase} onClick={onClick}>{children}</button>;
}
