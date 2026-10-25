import { Link } from "react-router-dom";
import Chakana from "./Chakana.jsx";

const BLOQUES = [
  {
    titulo: "Plataforma",
    enlaces: [
      { texto: "Cursos", to: "/explorador-cursos" },
      { texto: "Clase gratis", to: "/clase-muestra" },
      { texto: "Asesor virtual", to: "/asesor-virtual" },
    ],
  },
  { titulo: "Métodos de pago", elementos: ["Visa y Mastercard", "Yape y Plin", "PagoEfectivo", "Transferencia bancaria"] },
  { titulo: "Certificaciones", elementos: ["Certificado digital verificable por curso", "Constancia de horas para talleres en vivo"] },
];

export default function Pie() {
  return (
    <footer id="pie" className="pie">
      <div className="contenedor">
        <div className="pie__interior">

          <div className="pie__marca">
            <Link className="pie__logo" to="/">
              <Chakana />
              <span>wayra</span>
            </Link>
            <p className="pie__descripcion">Cursos y talleres en vivo con instructores peruanos verificados.</p>
            <address className="pie__direccion">
              Av. Arequipa 1234, Lince, Lima<br />
              <a href="mailto:hola@wayraacademy.pe">hola@wayraacademy.pe</a><br />
              <a href="tel:+5115551234">(01) 555 1234</a>
            </address>
          </div>

          {BLOQUES.map((bloque) => (
            <div className="pie__bloque" key={bloque.titulo}>
              <h2 className="pie__titulo">{bloque.titulo}</h2>
              <ul className="pie__lista">
                {bloque.enlaces
                  ? bloque.enlaces.map((enlace) => <li key={enlace.texto}><Link to={enlace.to}>{enlace.texto}</Link></li>)
                  : bloque.elementos.map((elemento) => <li key={elemento}>{elemento}</li>)}
              </ul>
            </div>
          ))}

        </div>

        <p className="pie__copyright">© 2026 Wayra Academy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
