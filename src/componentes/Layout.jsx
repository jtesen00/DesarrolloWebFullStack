import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Encabezado from "./Encabezado.jsx";
import Pie from "./Pie.jsx";
import ModalAcceso from "./ModalAcceso.jsx";
import { useTema } from "../hooks/useTema.js";

/* Estructura común de las cuatro páginas: encabezado, contenido de la ruta
   actual (<Outlet>), pie y modal de acceso. Antes cada HTML repetía todo
   esto; ahora se escribe una vez y cada página solo aporta su contenido. */
export default function Layout() {
  const { oscuro, alternarTema } = useTema();
  const [accesoAbierto, setAccesoAbierto] = useState(false);
  const { pathname, hash } = useLocation();

  // React Router no baja solo hasta un ancla (/#experiencias) ni vuelve
  // arriba al cambiar de página: lo hace este efecto.
  useEffect(() => {
    const destino = hash && document.getElementById(hash.slice(1));
    if (destino) destino.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a className="salto-contenido" href="#contenido">Saltar al contenido principal</a>

      <Encabezado
        oscuro={oscuro}
        onAlternarTema={alternarTema}
        onAbrirAcceso={() => setAccesoAbierto(true)}
      />

      <div className="disposicion">
        <Outlet />
      </div>

      <Pie />

      <ModalAcceso abierto={accesoAbierto} onCerrar={() => setAccesoAbierto(false)} />
    </>
  );
}
