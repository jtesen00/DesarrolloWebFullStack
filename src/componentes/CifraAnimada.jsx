import { useEffect, useRef, useState } from "react";

const MOVIMIENTO_REDUCIDO = "(prefers-reduced-motion: reduce)";
const DURACION = 1100;

/* Cifra que cuenta de 0 al valor final cuando entra en la ventana.
   El número que se anima es decorativo (aria-hidden): el lector de pantalla
   recibe siempre el valor final en un texto oculto visualmente, sin oír
   decenas de cambios. Sin movimiento o sin IntersectionObserver, la cifra
   se muestra completa desde el principio. */
export default function CifraAnimada({ valor, sufijo = "" }) {
  const referencia = useRef(null);
  const [mostrado, setMostrado] = useState(valor);

  useEffect(() => {
    const elemento = referencia.current;
    if (!elemento || !("IntersectionObserver" in window) || window.matchMedia(MOVIMIENTO_REDUCIDO).matches) return;

    setMostrado(0);
    let cuadro = 0;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const paso = (ahora) => {
          const avance = Math.min((ahora - inicio) / DURACION, 1);
          const suavizado = 1 - Math.pow(1 - avance, 3);
          setMostrado(Math.round(valor * suavizado));
          if (avance < 1) cuadro = requestAnimationFrame(paso);
        };
        cuadro = requestAnimationFrame(paso);
      },
      { threshold: 0.6 }
    );
    observador.observe(elemento);

    // Limpieza: sin esto, salir de la página a mitad de la cuenta dejaría un
    // cuadro de animación actualizando un componente que ya no existe.
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [valor]);

  return (
    <span className="cifra__valor" ref={referencia}>
      <span aria-hidden="true">{mostrado}{sufijo}</span>
      <span className="visualmente-oculto">{valor}{sufijo}</span>
    </span>
  );
}
