import { Link } from "react-router-dom";

/* Componente reutilizable: el mismo aspecto (.boton) para tres casos.
   · to      → navegación dentro de la aplicación (<Link>, sin recargar).
   · href    → ancla de la misma página o enlace externo (<a>).
   · onClick → acción en esta misma página (<button>).
   «variante»: primario | secundario | lima | oscuro. «flecha» añade →;
   «grande» sube el tamaño para las llamadas a la acción. */
export default function Boton({
  variante = "primario", flecha = false, grande = false,
  to, href, onClick, type = "button", children,
}) {
  const clase = [
    "boton",
    `boton--${variante}`,
    flecha && "boton--flecha",
    grande && "boton--grande",
  ].filter(Boolean).join(" ");

  if (to) return <Link className={clase} to={to} onClick={onClick}>{children}</Link>;
  if (href) return <a className={clase} href={href} onClick={onClick}>{children}</a>;
  return <button type={type} className={clase} onClick={onClick}>{children}</button>;
}
