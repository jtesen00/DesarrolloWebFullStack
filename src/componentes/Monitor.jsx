import { useEffect, useState } from "react";

// Convierte segundos en el formato mm:ss.
function formatear(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}

/* Monitor del tiempo de estudio en esta visita. El usuario lo activa,
   lo detiene o lo reinicia; mientras está activo suma un segundo por tick. */
export default function Monitor() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    // Detenido: no se crea ningún intervalo.
    if (!activo) return;

    // Forma funcional: cada tick parte del valor más reciente, no de uno
    // capturado al crear el intervalo.
    const intervalo = setInterval(() => setSegundos((previo) => previo + 1), 1000);

    // Limpieza: al detener, al salir de la página o antes de volver a
    // ejecutar el efecto, se elimina el intervalo anterior. Así nunca hay
    // dos intervalos a la vez y el contador no se acelera.
    return () => clearInterval(intervalo);
  }, [activo]);

  function reiniciar() {
    setActivo(false);
    setSegundos(0);
  }

  return (
    <div className="monitor">
      <p className="monitor__tiempo" aria-hidden="true">{formatear(segundos)}</p>
      <p className="lateral__apunte" role="status">
        {activo ? "Monitor activo" : "Monitor detenido"} · {segundos} s registrados
      </p>
      <div className="monitor__controles">
        <button type="button" className="boton boton--primario" onClick={() => setActivo(true)} disabled={activo}>
          Activar
        </button>
        <button type="button" className="boton boton--secundario" onClick={() => setActivo(false)} disabled={!activo}>
          Detener
        </button>
        <button type="button" className="boton boton--secundario" onClick={reiniciar} disabled={segundos === 0 && !activo}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
