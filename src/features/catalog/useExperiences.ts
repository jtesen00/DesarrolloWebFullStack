import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "./api.ts";

/* Consulta de una página del catálogo.
   · queryKey ['experiences', page]: la página forma parte de la clave, así
     cada página tiene su propia entrada en la caché. Si no estuviera, la
     página 2 pisaría a la 1 y volver atrás obligaría a pedirla de nuevo.
   · queryFn: TanStack Query le pasa un signal para cancelar la petición si
     la página deja de interesar (cambio rápido de página).
   · simularError usa otra clave: la prueba de error no ensucia la caché de
     las páginas buenas. */
export function useExperiences(page: number, simularError = false) {
  return useQuery({
    queryKey: simularError ? ["experiences", page, "error-simulado"] : ["experiences", page],
    queryFn: ({ signal }) => getExperiences(page, { signal, simularError }),
    staleTime: 60_000,
  });
}
