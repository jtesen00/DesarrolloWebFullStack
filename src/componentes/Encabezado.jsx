import { useState } from "react";
import { Link } from "react-router-dom";
import BotonTema from "./BotonTema.jsx";

const ENLACES = [
  { texto: "Inicio", destino: "/#contenido" },
  { texto: "Cursos", destino: "/#experiencias" },
  { texto: "Talleres en vivo", destino: "/#experiencias" },
  { texto: "Nosotros", destino: "#pie" },
];

export default function Encabezado({ oscuro, onAlternarTema, onAbrirAcceso }) {
  // El menú de celular sigue siendo una casilla real (foco y teclado
  // nativos); React solo la controla para cerrarla al elegir un enlace.
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="encabezado">
      <div className="encabezado__interior">

        <div className="marca">
          <img className="marca__logo" src="/img/logo-wayra.svg" alt="" width="40" height="40" />
          <p className="marca__nombre">Wayra Academy</p>
          <p className="marca__eslogan">Tu centro de aprendizaje</p>
        </div>

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
          <label htmlFor="interruptor-menu" className="navegacion__boton">
            <span className="navegacion__linea"></span>
            <span className="navegacion__linea"></span>
            <span className="navegacion__linea"></span>
          </label>
          <ul className="navegacion__lista">
            {ENLACES.map((enlace) => (
              <li key={enlace.texto}>
                {enlace.destino.startsWith("#")
                  ? <a href={enlace.destino} onClick={cerrarMenu}>{enlace.texto}</a>
                  : <Link to={enlace.destino} onClick={cerrarMenu}>{enlace.texto}</Link>}
              </li>
            ))}
            <li>
              <button
                type="button"
                className="navegacion__acceso"
                onClick={() => { cerrarMenu(); onAbrirAcceso(); }}
              >
                Ingresar o registrarse
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  );
}
