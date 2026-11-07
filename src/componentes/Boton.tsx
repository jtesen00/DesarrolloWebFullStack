import type { MouseEventHandler, ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { tapBoton } from "../animaciones/tarjeta.ts";

interface BotonBase {
  variante?: "primario" | "secundario" | "lima" | "oscuro";
  flecha?: boolean;
  grande?: boolean;
  children: ReactNode;
}

/* Unión discriminada: «to» y «href» se excluyen entre sí, y las propiedades
   propias de <button> no se aceptan en un enlace. */
interface BotonRuta extends BotonBase {
  to: string;
  href?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

interface BotonEnlace extends BotonBase {
  href: string;
  to?: never;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

interface BotonAccion extends BotonBase {
  to?: never;
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  "aria-pressed"?: boolean;
}

type BotonProps = BotonRuta | BotonEnlace | BotonAccion;

/* Componente reutilizable: el mismo aspecto (.boton) para tres casos.
   · to      → navegación dentro de la aplicación (<Link>, sin recargar).
   · href    → ancla de la misma página o enlace externo (<a>).
   · onClick → acción en esta misma página (<button>).
   «variante»: primario | secundario | lima | oscuro. «flecha» añade →;
   «grande» sube el tamaño para las llamadas a la acción. */
export default function Boton(props: BotonProps) {
  const { variante = "primario", flecha = false, grande = false, children } = props;
  const reducirMovimiento = useReducedMotion();
  const clase = [
    "boton",
    `boton--${variante}`,
    flecha && "boton--flecha",
    grande && "boton--grande",
  ].filter(Boolean).join(" ");

  if (props.to !== undefined) return <Link className={clase} to={props.to} onClick={props.onClick}>{children}</Link>;
  if (props.href !== undefined) return <a className={clase} href={props.href} onClick={props.onClick}>{children}</a>;
  return (
    <m.button
      type={props.type ?? "button"}
      className={clase}
      aria-pressed={props["aria-pressed"]}
      onClick={props.onClick}
      whileTap={reducirMovimiento ? undefined : tapBoton}
    >
      {children}
    </m.button>
  );
}
