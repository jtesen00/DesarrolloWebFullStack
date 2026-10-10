/* Bloque reutilizable de la columna complementaria. Lo usan las cuatro
   páginas: cambia el título y el contenido, no la estructura. */
export default function BloqueLateral({ titulo, fijo = false, children }) {
  return (
    <div className={fijo ? "lateral__bloque lateral__bloque--fijo" : "lateral__bloque"}>
      <h2 className="lateral__titulo">{titulo}</h2>
      {children}
    </div>
  );
}
