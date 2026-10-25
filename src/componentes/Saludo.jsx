/* Recibe por props a quién saludar y, opcionalmente, un mensaje.
   El saludo cambia según la hora del día de quien visita la página. */

function saludoSegunHora(hora) {
  if (hora < 12) return "Buenos días";
  if (hora < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function Saludo({ nombre, mensaje }) {
  const saludo = saludoSegunHora(new Date().getHours());

  return (
    <p className="saludo">
      <span className="saludo__hola">{saludo}, {nombre}.</span>
      {mensaje && <> {mensaje}</>}
    </p>
  );
}
