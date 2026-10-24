import { useEffect } from "react";

const MOVIMIENTO_REDUCIDO = "(prefers-reduced-motion: reduce)";

/* Hace que los elementos marcados con data-aparece entren con un fundido
   suave al llegar a la ventana. Es una mejora progresiva: el CSS solo los
   oculta cuando este efecto ya los preparó, así que sin JavaScript, sin
   IntersectionObserver o con «reducir movimiento» el contenido se ve siempre.
   Se vuelve a ejecutar en cada página (la clave es la ruta). */
export function useAparicion(clave) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia(MOVIMIENTO_REDUCIDO).matches) return;

    const elementos = [...document.querySelectorAll("[data-aparece]")];
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("aparece--visible");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    elementos.forEach((elemento) => {
      elemento.classList.add("aparece--preparado");
      observador.observe(elemento);
    });

    return () => observador.disconnect();
  }, [clave]);
}
