/* Interruptor del tema. aria-pressed dice si el modo oscuro está activo; el
   nombre no cambia, lo que cambia es el estado. */
export default function BotonTema({ oscuro, onAlternar }) {
  return (
    <button type="button" className="tema" aria-pressed={oscuro} aria-label="Modo oscuro" onClick={onAlternar}>
      <svg className="tema__luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="tema__sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
      </svg>
    </button>
  );
}
