import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BotonTema from "./BotonTema.jsx";
import Chakana from "./Chakana.jsx";
import Boton from "./Boton.jsx";

const ENLACES = [
  { texto: "Cursos", destino: "/explorador-cursos" },
  { texto: "Clase gratis", destino: "/clase-muestra" },
  { texto: "Asesor virtual", destino: "/asesor-virtual" },
  { texto: "Nosotros", destino: "#pie" },
];

export default function Encabezado({ oscuro, onAlternarTema, onAbrirAcceso }) {
  // El menú de celular sigue siendo una casilla real (foco y teclado
  // nativos); React solo la controla para cerrarla al elegir un enlace.
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="encabezado">
      <div className="encabezado__interior contenedor">

        <Link className="marca" to="/" onClick={cerrarMenu}>
          <Chakana className="marca__logo" />
          <span className="marca__nombre">wayra</span>
        </Link>

        <BotonTema oscuro={oscuro} onAlternar={onAlternarTema} />

        <nav className="navegacion" aria-label="Navegación principal">
          <input
            type="checkbox"
            id="interruptor-menu"
            className="navegacion__interruptor"
            aria-label="Abrir menú de navegación"
            checked={menuAbierto}
            onChange={(evento) => setMenuAbierto(evento.target.checked)}
          />
          <label htmlFor="interruptor-menu" className="navegacion__boton" aria-hidden="true">
            <span className="navegacion__linea"></span>
            <span className="navegacion__linea"></span>
            <span className="navegacion__linea"></span>
          </label>
          <ul className="navegacion__lista">
            {ENLACES.map((enlace) => (
              <li key={enlace.texto}>
                {enlace.destino.startsWith("#")
                  ? <Link to={enlace.destino} onClick={cerrarMenu}>{enlace.texto}</Link>
                  : <NavLink to={enlace.destino} onClick={cerrarMenu}>{enlace.texto}</NavLink>}
              </li>
            ))}
            <li className="navegacion__solo-movil">
              <button type="button" className="navegacion__acceso" onClick={() => { cerrarMenu(); onAbrirAcceso(); }}>
                Ingresar
              </button>
            </li>
            <li className="navegacion__solo-movil">
              <Boton variante="primario" flecha to="/clase-muestra" onClick={cerrarMenu}>Empieza gratis</Boton>
            </li>
          </ul>
        </nav>

        <div className="encabezado__acciones">
          <button type="button" className="navegacion__acceso" onClick={onAbrirAcceso}>Ingresar</button>
          <Boton variante="primario" flecha to="/clase-muestra">Empieza gratis</Boton>
        </div>

      </div>
    </header>
  );
}
