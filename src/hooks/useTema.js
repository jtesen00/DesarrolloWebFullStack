import { useEffect, useState } from "react";

/* Tema claro/oscuro (Semana 4, RF1, ahora como hook).
   El primer valor lo pone el script de index.html antes de que React
   cargue, para que no haya destello claro. Este hook solo lo continúa:
   React guarda el estado y un efecto lo refleja en <html>. */

const CLAVE_TEMA = "wayra-tema";
const CLASE_OSCURA = "tema-oscuro";

function guardarTema(oscuro) {
  try {
    localStorage.setItem(CLAVE_TEMA, oscuro ? "oscuro" : "claro");
  } catch {
    // Sin almacenamiento el cambio funciona igual; solo no se recuerda.
  }
}

export function useTema() {
  const [oscuro, setOscuro] = useState(() =>
    document.documentElement.classList.contains(CLASE_OSCURA)
  );

  // JavaScript no toca ningún color: solo pone o quita la clase.
  useEffect(() => {
    document.documentElement.classList.toggle(CLASE_OSCURA, oscuro);
  }, [oscuro]);

  // Con el sitio abierto en dos pestañas, la otra se entera del cambio.
  useEffect(() => {
    function alCambiarEnOtraPestana(evento) {
      if (evento.key === CLAVE_TEMA) setOscuro(evento.newValue === "oscuro");
    }
    window.addEventListener("storage", alCambiarEnOtraPestana);
    return () => window.removeEventListener("storage", alCambiarEnOtraPestana);
  }, []);

  function alternarTema() {
    const siguiente = !oscuro;
    guardarTema(siguiente);

    const aplicar = () => {
      document.documentElement.classList.toggle(CLASE_OSCURA, siguiente);
      setOscuro(siguiente);
    };

    // View Transitions: el navegador fotografía la página, aplica el cambio
    // y hace un fundido entre las dos. Donde no exista (o con «reducir
    // movimiento») el cambio es instantáneo, igual que antes.
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !sinMovimiento) {
      document.startViewTransition(aplicar);
    } else {
      aplicar();
    }
  }

  return { oscuro, alternarTema };
}
