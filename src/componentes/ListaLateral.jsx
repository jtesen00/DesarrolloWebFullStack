/* Lista de dato + apunte, el patrón que repiten los bloques laterales. */
export default function ListaLateral({ elementos }) {
  return (
    <ul className="lateral__lista">
      {elementos.map((elemento) => (
        <li key={elemento.dato}>
          <span className="lateral__dato">{elemento.dato}</span>
          <span className="lateral__apunte">{elemento.apunte}</span>
        </li>
      ))}
    </ul>
  );
}
