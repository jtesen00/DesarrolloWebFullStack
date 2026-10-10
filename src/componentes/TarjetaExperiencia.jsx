import Boton from "./Boton.jsx";

/* Una experiencia de la portada. Las tres tarjetas son este mismo
   componente con props distintas. */
export default function TarjetaExperiencia({ id, imagen, alt, titulo, texto, destino, accion }) {
  return (
    <article className="tarjeta" aria-labelledby={id}>
      <div className="tarjeta__medio">
        <img src={imagen} width="800" height="500" alt={alt} />
      </div>
      <div className="tarjeta__cuerpo">
        <h2 className="tarjeta__titulo" id={id}>{titulo}</h2>
        <p className="tarjeta__texto">{texto}</p>
        <Boton variante="secundario" to={destino}>{accion}</Boton>
      </div>
    </article>
  );
}
