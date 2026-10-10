/* Interruptor del tema. aria-pressed dice si el modo oscuro está activo. */
export default function BotonTema({ oscuro, onAlternar }) {
  return (
    <button type="button" className="tema" aria-pressed={oscuro} onClick={onAlternar}>
      <span className="tema__interruptor" aria-hidden="true"></span>
      Modo oscuro
    </button>
  );
}
