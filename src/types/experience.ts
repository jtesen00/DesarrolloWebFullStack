/* Contrato de datos de la plataforma: en Wayra Academy cada experiencia es un
   curso. Es el único lugar donde se define esta forma; catálogo, tarjeta y
   explorador importan estos tipos en lugar de repetirlos. */

export type ExperienceCategory = "desarrollo-web" | "datos-ia" | "diseno" | "negocios";

export type ExperienceLevel = "principiante" | "intermedio" | "avanzado";

export interface Experience {
  id: string;
  titulo: string;
  texto: string;
  categoria: ExperienceCategory;
  nivel: ExperienceLevel;
  horas: number;
  /* Escala de 0 a 5. El tipo solo garantiza que sea un número: el rango
     depende de quien escribe los datos. */
  valoracion: number;
  temario: string[];
  destacado?: boolean;
  imagenUrl?: string;
}
