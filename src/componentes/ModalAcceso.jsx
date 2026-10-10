import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Boton from "./Boton.jsx";

const ENTRADA = [
  { opacity: 0, transform: "translateY(1.5rem) scale(0.96)" },
  { opacity: 1, transform: "translateY(0) scale(1)" },
];
const TIEMPO = { duration: 280, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" };

/* Modal «Ingresar o registrarse» (Semana 4, RF3). Sigue siendo un <dialog>
   nativo: showModal() deja inerte el resto de la página, cierra con Esc y
   devuelve el foco al botón que lo abrió. React decide CUÁNDO está
   abierto (prop «abierto»); el efecto lo sincroniza con el <dialog>. */
export default function ModalAcceso({ abierto, onCerrar }) {
  const dialogo = useRef(null);
  // pointerdown y click deben ocurrir los dos sobre el velo: si alguien
  // selecciona texto del panel y suelta fuera, no se cierra.
  const presionadoEnVelo = useRef(false);

  useEffect(() => {
    const modal = dialogo.current;
    if (abierto && !modal.open) {
      modal.showModal();
      // La media query del CSS no frena las animaciones de element.animate().
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      modal.animate(ENTRADA, TIEMPO);
      try {
        modal.animate({ opacity: [0, 1] }, { ...TIEMPO, pseudoElement: "::backdrop" });
      } catch {
        // Sin fundido del velo: aparece de golpe, que es lo normal.
      }
    } else if (!abierto && modal.open) {
      modal.close();
    }
  }, [abierto]);

  function alPresionar(evento) {
    presionadoEnVelo.current = evento.target === dialogo.current;
  }

  // El relleno está en .modal__caja: el <dialog> solo es el destino del
  // clic cuando se pulsa fuera del panel, sobre el velo.
  function alHacerClic(evento) {
    if (evento.target === dialogo.current && presionadoEnVelo.current) onCerrar();
    presionadoEnVelo.current = false;
  }

  return (
    <dialog
      className="modal"
      ref={dialogo}
      aria-labelledby="modal-acceso-titulo"
      onClose={onCerrar}
      onPointerDown={alPresionar}
      onClick={alHacerClic}
    >
      <div className="modal__caja">
        <h2 className="modal__titulo" id="modal-acceso-titulo">Ingresar o registrarse</h2>
        <button type="button" className="modal__cerrar" aria-label="Cerrar ventana" onClick={onCerrar}>&times;</button>
        <p className="modal__texto">
          El registro en línea se abre junto con la próxima fecha de inicio. Mientras tanto,
          puedes dejar lista tu inscripción de dos maneras:
        </p>
        <ul className="modal__lista">
          <li>Haz el <Link to="/asesor-virtual" onClick={onCerrar}>test del asesor virtual</Link> y llega con tu ruta elegida.</li>
          <li>Escríbenos a <a href="mailto:hola@wayraacademy.pe">hola@wayraacademy.pe</a> y te reservamos un lugar.</li>
        </ul>
        <Boton onClick={onCerrar}>Entendido</Boton>
      </div>
    </dialog>
  );
}
