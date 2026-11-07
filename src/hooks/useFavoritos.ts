import { useEffect, useState } from "react";

/* Cursos marcados como favoritos. El estado vive aquí y no en cada tarjeta
   porque los filtros desmontan las tarjetas: un useState local se perdería al
   ocultarlas. Se recuerda entre visitas con localStorage, igual que el tema. */

const CLAVE_FAVORITOS = "wayra-favoritos";

/* localStorage devuelve texto que cualquiera pudo editar: aunque TypeScript
   conozca el tipo de la aplicación, aquí hay que comprobarlo al ejecutar. */
function interpretar(texto: string | null): string[] {
  if (texto === null) return [];
  try {
    const valor: unknown = JSON.parse(texto);
    if (!Array.isArray(valor)) return [];
    return valor.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function leerFavoritos(): string[] {
  try {
    return interpretar(localStorage.getItem(CLAVE_FAVORITOS));
  } catch {
    return [];
  }
}

function guardarFavoritos(favoritos: string[]): void {
  try {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  } catch {
    // Sin almacenamiento el botón funciona igual; solo no se recuerda.
  }
}

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>(leerFavoritos);

  useEffect(() => {
    guardarFavoritos(favoritos);
  }, [favoritos]);

  // Con el sitio abierto en dos pestañas, la otra se entera del cambio.
  useEffect(() => {
    function alCambiarEnOtraPestana(evento: StorageEvent) {
      if (evento.key === CLAVE_FAVORITOS) setFavoritos(interpretar(evento.newValue));
    }
    window.addEventListener("storage", alCambiarEnOtraPestana);
    return () => window.removeEventListener("storage", alCambiarEnOtraPestana);
  }, []);

  function esFavorito(id: string): boolean {
    return favoritos.includes(id);
  }

  function alternarFavorito(id: string): void {
    setFavoritos((actuales) =>
      actuales.includes(id) ? actuales.filter((favorito) => favorito !== id) : [...actuales, id]
    );
  }

  return { esFavorito, alternarFavorito };
}
