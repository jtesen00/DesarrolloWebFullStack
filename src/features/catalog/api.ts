/* Acceso a la API del catálogo de experiencias (semana 11, Desarrollo Web).
   Fuente: JSONPlaceholder, API pública de práctica sin token.

   Ojo con el nombre: este Experience es el de la API remota (userId, id,
   title, body). Los cursos propios de Wayra usan otro tipo, el de
   src/types/experience.ts, y no se mezclan. */

export type Experience = { userId: number; id: number; title: string; body: string };

export interface ExperiencesPage {
  items: Experience[];
  page: number;
  totalPages: number;
  total: number;
}

export const EXPERIENCES_PER_PAGE = 6;

const API_URL = import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com";

/* Ruta inexistente para la prueba de error del catálogo: responde 404. */
const RUTA_INVALIDA = "/posts-ruta-invalida";

function esExperience(valor: unknown): valor is Experience {
  const v = valor as Partial<Experience> | null;
  return (
    typeof v === "object" && v !== null &&
    typeof v.userId === "number" && typeof v.id === "number" &&
    typeof v.title === "string" && typeof v.body === "string"
  );
}

interface Opciones {
  signal?: AbortSignal;
  simularError?: boolean;
}

/* GET /posts?_page={page}&_limit=6. JSONPlaceholder devuelve el total en la
   cabecera X-Total-Count; con él se sabe cuál es la última página. */
export async function getExperiences(page: number, { signal, simularError = false }: Opciones = {}): Promise<ExperiencesPage> {
  const ruta = simularError ? RUTA_INVALIDA : "/posts";
  let response: Response;
  try {
    response = await fetch(`${API_URL}${ruta}?_page=${page}&_limit=${EXPERIENCES_PER_PAGE}`, { signal });
  } catch (error) {
    // Una cancelación no es un fallo: TanStack Query la gestiona solo.
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    // fetch solo lanza si no hubo respuesta (sin red, servidor caído, CORS).
    throw new Error("No hay conexión con el servidor del catálogo.");
  }

  // fetch no falla con un 404 o un 500: hay que comprobarlo a mano.
  if (!response.ok) throw new Error(`El servidor respondió con el código HTTP ${response.status}.`);

  const datos: unknown = await response.json();
  if (!Array.isArray(datos) || !datos.every(esExperience)) {
    throw new Error("La API respondió con un formato inesperado.");
  }

  const total = Number(response.headers.get("x-total-count")) || datos.length;
  return {
    items: datos,
    page,
    total,
    totalPages: Math.max(1, Math.ceil(total / EXPERIENCES_PER_PAGE)),
  };
}
