import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Encabezado from "./Encabezado.jsx";
import Pie from "./Pie.jsx";
import ModalAcceso from "./ModalAcceso.jsx";
import { useTema } from "../hooks/useTema.js";
import { useAparicion } from "../hooks/useAparicion.js";

const MOVIMIENTO_REDUCIDO = "(prefers-reduced-motion: reduce)";

/* Estructura común de todas las páginas: encabezado, contenido de la ruta
   actual (<Outlet>), pie y modal de acceso. Cada página aporta su propio
   <main id="contenido"> y, si lo necesita, su columna lateral.

   También resuelve lo que un enrutador de una sola página no hace solo al
   cambiar de ruta: volver arriba y mover el foco al contenido nuevo para que
   teclado y lector de pantalla sepan que la página cambió. */
export default function Layout() {
  const { oscuro, alternarTema } = useTema();
  const [accesoAbierto, setAccesoAbierto] = useState(false);
  const { pathname, hash } = useLocation();
  const rutaAnterior = useRef(pathname);

  useAparicion(pathname);

  useEffect(() => {
    const cambioDePagina = rutaAnterior.current !== pathname;
    rutaAnterior.current = pathname;
    const reducido = window.matchMedia(MOVIMIENTO_REDUCIDO).matches;

    // 1) Página nueva: el foco pasa a su <h1>. Sin esto, quien navega con
    //    teclado o lector de pantalla se quedaría en el enlace que pulsó,
    //    ya inexistente, y tendría que recorrer el encabezado otra vez.
    //    El lector lee el título al recibir el foco, y el siguiente Tab cae
    //    en el primer control del contenido. En la primera carga no se roba
    //    el foco. (Se enfoca el <h1> y no <main> porque algunas páginas usan
    //    display: contents en <main>, que no tiene caja y no admite foco.)
    if (cambioDePagina) {
      const titulo = document.querySelector("#contenido h1") ?? document.getElementById("contenido");
      if (titulo) {
        titulo.setAttribute("tabindex", "-1");
        titulo.focus({ preventScroll: true });
      }
    }

    // 2) Ancla (/#agenda): baja suavemente hasta la sección y le da el foco.
    //    Sin ancla: arriba de todo, sin animar (un viaje largo marearía).
    const destino = hash && document.getElementById(hash.slice(1));
    if (destino) {
      destino.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
      if (!destino.hasAttribute("tabindex")) destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return (
    <>
      <a className="salto-contenido" href="#contenido">Saltar al contenido principal</a>

      <Encabezado
        oscuro={oscuro}
        onAlternarTema={alternarTema}
        onAbrirAcceso={() => setAccesoAbierto(true)}
      />

      {/* La clave fuerza un montaje nuevo por ruta: así la animación de
          entrada se repite en cada página. */}
      <div key={pathname} className="pagina-animada">
        <Outlet />
      </div>

      <Pie />

      <ModalAcceso abierto={accesoAbierto} onCerrar={() => setAccesoAbierto(false)} />
    </>
  );
}
