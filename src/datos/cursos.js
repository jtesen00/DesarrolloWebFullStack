/* Catálogo de Wayra Academy. Antes cada página repetía estos cinco cursos
   en su HTML; ahora viven en un solo lugar y los componentes los leen. */

export const CATEGORIAS = {
  "desarrollo-web": "Desarrollo web",
  "datos-ia": "Datos e IA",
  diseno: "Diseño",
  negocios: "Negocios digitales",
};

export const NIVELES = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const CURSOS = [
  {
    id: "frontend",
    titulo: "Frontend con HTML5, CSS3 y JavaScript",
    categoria: "desarrollo-web",
    nivel: "principiante",
    horas: 28,
    texto: "Construye interfaces accesibles desde cero, sin frameworks, con buenas prácticas de semántica.",
    temario: ["HTML5 semántico y accesibilidad", "CSS3: layout, variables y responsive", "JavaScript: DOM y eventos"],
    imagen: "/img/cursos/frontend.svg",
    alt: "Ventana de navegador con el símbolo de etiqueta de cierre de HTML.",
  },
  {
    id: "react",
    titulo: "React desde cero",
    categoria: "desarrollo-web",
    nivel: "intermedio",
    horas: 36,
    texto: "Componentes, estado y consumo de APIs para construir interfaces dinámicas.",
    temario: ["Componentes y props", "Estado y efectos", "Consumo de APIs REST"],
    imagen: "/img/cursos/react.svg",
    alt: "Átomo con tres órbitas alrededor de un núcleo, símbolo de React.",
  },
  {
    id: "datos",
    titulo: "Fundamentos de análisis de datos",
    categoria: "datos-ia",
    nivel: "principiante",
    horas: 20,
    texto: "Limpieza, visualización e interpretación de datos con herramientas prácticas.",
    temario: ["Limpieza y transformación de datos", "Visualización con gráficos", "Interpretación de resultados"],
    imagen: "/img/cursos/datos.svg",
    alt: "Gráfico de barras con una línea de tendencia que sube.",
  },
  {
    id: "ux-ui",
    titulo: "Diseño UX/UI para producto digital",
    categoria: "diseno",
    nivel: "intermedio",
    horas: 24,
    texto: "Investigación, wireframes y prototipado centrado en accesibilidad.",
    temario: ["Investigación con usuarios", "Wireframes y prototipado", "Sistemas de diseño y accesibilidad"],
    imagen: "/img/cursos/ux-ui.svg",
    alt: "Boceto de pantalla de celular junto a un lápiz.",
  },
  {
    id: "marketing",
    titulo: "Marketing digital para emprendedores",
    categoria: "negocios",
    nivel: "avanzado",
    horas: 18,
    texto: "Estrategia de contenido, publicidad y métricas para negocios en línea.",
    temario: ["Estrategia de contenido", "Publicidad en redes", "Métricas y analítica"],
    imagen: "/img/cursos/marketing.svg",
    alt: "Megáfono con ondas de sonido.",
  },
];

// Hora de Lima (UTC−5, sin horario de verano) escrita explícitamente, para
// que la cuenta regresiva sea la misma en cualquier zona horaria.
export const PROXIMOS_INICIOS = [
  { curso: "Frontend con HTML5, CSS3 y JavaScript", fecha: "2026-09-21T19:00:00-05:00", texto: "Lunes 21 de septiembre · 19:00 (hora de Lima)" },
  { curso: "Fundamentos de análisis de datos", fecha: "2026-10-05T19:00:00-05:00", texto: "Lunes 5 de octubre · 19:00 (hora de Lima)" },
  { curso: "Diseño UX/UI para producto digital", fecha: "2026-10-19T20:00:00-05:00", texto: "Lunes 19 de octubre · 20:00 (hora de Lima)" },
];

export function datosDelCurso(curso) {
  return `${CATEGORIAS[curso.categoria]} · ${NIVELES[curso.nivel]} · ${curso.horas} horas`;
}
