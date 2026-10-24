/* Maqueta del reproductor de la portada: una clase en vivo con el código real
   de la lección. Es ilustrativa, no interactiva: se expone como una imagen con
   descripción y el código no se lee línea por línea. */
const LINEAS = [
  [["cod-etiqueta", '<main id="contenido">']],
  [["cod-etiqueta", "  <h1>"], ["", "Hola, Wayra"], ["cod-etiqueta", "</h1>"]],
  [["cod-etiqueta", "  <button "], ["cod-atributo", "type="], ["cod-cadena", '"button"'], ["cod-etiqueta", ">"]],
  [["", "    Empezar"]],
  [["cod-etiqueta", "  </button>"]],
  [["cod-etiqueta", "</main>"]],
];

export default function ReproductorMuestra() {
  return (
    <figure
      className="reproductor"
      role="img"
      aria-label="Vista previa de una clase en vivo: código HTML con un título y un botón, en la lección «HTML5 semántico y accesibilidad»."
      style={{ margin: 0 }}
    >
      <div className="reproductor__barra" aria-hidden="true">
        <span>clase-01.html</span>
        <span className="reproductor__vivo">En vivo</span>
      </div>
      <pre className="reproductor__codigo" aria-hidden="true">
        {LINEAS.map((partes, i) => (
          <code className="reproductor__linea" key={i}>
            {partes.map(([clase, texto], j) => <span className={clase || undefined} key={j}>{texto}</span>)}
          </code>
        ))}
      </pre>
      <div className="reproductor__pie" aria-hidden="true">
        <p className="reproductor__titulo">HTML5 semántico y accesibilidad</p>
        <p className="reproductor__meta">Frontend · Módulo 1 de 3</p>
        <div className="reproductor__pista"><span className="reproductor__avance"></span></div>
      </div>
    </figure>
  );
}
