/* Lista de dato + apunte, el patrón que repiten los bloques laterales.
   «numerada» antepone 01, 02… (los números los pone el CSS). */
export default function ListaLateral({ elementos, numerada = false }) {
  return (
    <ul className={`lateral__lista${numerada ? "" : " lateral__lista--simple"}`}>
      {elementos.map((elemento) => (
        <li key={elemento.dato}>
          <span>
            <span className="lateral__dato">{elemento.dato}</span>
            <span className="lateral__apunte">{elemento.apunte}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
