import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "./api.ts";

/* Consulta de una página del catálogo.
   · queryKey ['experiences', page]: la página forma parte de la clave, así
     cada página tiene su propia entrada en la caché. Si no estuviera, la
     página 2 pisaría a la 1 y volver atrás obligaría a pedirla de nuevo.
   · queryFn: no se le pasa el signal de cancelación a fetch. Con signal,
     StrictMode (que en desarrollo monta, desmonta y vuelve a montar) hacía
     que TanStack Query cancelara la primera petición y lanzara otra: en la
     pestaña Network aparecía una petición «fallida» (net::ERR_ABORTED).
     Sin signal, la petición en curso se reutiliza; y si el usuario cambia de
     página antes de que llegue, la respuesta igual queda en caché.
   · staleTime 60 s: la página se reutiliza sin volver a pedirla durante un
     minuto. */
export function useExperiences(page: number) {
  return useQuery({
    queryKey: ["experiences", page],
    queryFn: () => getExperiences(page),
    staleTime: 60_000,
  });
}
