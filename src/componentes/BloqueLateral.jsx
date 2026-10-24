/* Bloque reutilizable de la columna complementaria. Lo usan las páginas con
   aside: cambia el título y el contenido, no la estructura.
   «tono»: "accion" (azul) o "recomendacion" (noche); sin él, superficie. */
export default function BloqueLateral({ titulo, fijo = false, tono, children }) {
  const clase = [
    "lateral__bloque",
    fijo && "lateral__bloque--fijo",
    tono && `lateral__bloque--${tono}`,
  ].filter(Boolean).join(" ");

  return (
    <div className={clase}>
      <h2 className="lateral__titulo">{titulo}</h2>
      {children}
    </div>
  );
}
