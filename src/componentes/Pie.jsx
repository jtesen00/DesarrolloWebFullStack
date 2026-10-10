const BLOQUES = [
  { titulo: "Redes sociales", elementos: ["Facebook", "Instagram", "YouTube", "LinkedIn"], enlaces: true },
  { titulo: "Métodos de pago", elementos: ["Visa y Mastercard", "Yape y Plin", "PagoEfectivo", "Transferencia bancaria"] },
  { titulo: "Certificaciones", elementos: ["Certificado digital verificable por curso", "Constancia de horas para talleres en vivo"] },
];

export default function Pie() {
  return (
    <footer id="pie" className="pie">
      <div className="pie__interior">

        <div className="pie__bloque">
          <h2 className="pie__titulo">Contacto</h2>
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
              {bloque.elementos.map((elemento) => (
                <li key={elemento}>{bloque.enlaces ? <a href="#pie">{elemento}</a> : elemento}</li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <p className="pie__copyright">© 2026 Wayra Academy. Todos los derechos reservados.</p>
    </footer>
  );
}
