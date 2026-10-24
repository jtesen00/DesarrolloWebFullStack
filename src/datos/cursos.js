/* Catálogo de Wayra Academy. Todo lo que se muestra de un curso sale de este
   archivo: para agregar uno basta con sumar un objeto a CURSOS. */

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

/* «destacado» marca los cursos que se muestran en el mosaico de la portada;
   el resto aparece en el carrusel «Más cursos» y en el explorador. */
export const CURSOS = [
  {
    id: "frontend",
    titulo: "Frontend con HTML5, CSS3 y JavaScript",
    categoria: "desarrollo-web",
    nivel: "principiante",
    horas: 28,
    destacado: true,
    texto: "Construye interfaces accesibles desde cero, sin frameworks, con buenas prácticas de semántica.",
    temario: ["HTML5 semántico y accesibilidad", "CSS3: layout, variables y responsive", "JavaScript: DOM y eventos"],
  },
  {
    id: "react",
    titulo: "React desde cero",
    categoria: "desarrollo-web",
    nivel: "intermedio",
    horas: 36,
    destacado: true,
    texto: "Componentes, estado y consumo de APIs para construir interfaces dinámicas.",
    temario: ["Componentes y props", "Estado y efectos", "Consumo de APIs REST"],
  },
  {
    id: "datos",
    titulo: "Fundamentos de análisis de datos",
    categoria: "datos-ia",
    nivel: "principiante",
    horas: 20,
    destacado: true,
    texto: "Limpieza, visualización e interpretación de datos con herramientas prácticas.",
    temario: ["Limpieza y transformación de datos", "Visualización con gráficos", "Interpretación de resultados"],
  },
  {
    id: "ux-ui",
    titulo: "Diseño UX/UI para producto digital",
    categoria: "diseno",
    nivel: "intermedio",
    horas: 24,
    destacado: true,
    texto: "Investigación, wireframes y prototipado centrado en accesibilidad.",
    temario: ["Investigación con usuarios", "Wireframes y prototipado", "Sistemas de diseño y accesibilidad"],
  },
  {
    id: "marketing",
    titulo: "Marketing digital para emprendedores",
    categoria: "negocios",
    nivel: "avanzado",
    horas: 18,
    destacado: true,
    texto: "Estrategia de contenido, publicidad y métricas para negocios en línea.",
    temario: ["Estrategia de contenido", "Publicidad en redes", "Métricas y analítica"],
  },
  {
    id: "git",
    titulo: "Git y GitHub para trabajar en equipo",
    categoria: "desarrollo-web",
    nivel: "principiante",
    horas: 8,
    texto: "Control de versiones desde la primera línea: ramas, commits claros y pull requests.",
    temario: ["Repositorios, commits y ramas", "Colaborar con pull requests", "Resolver conflictos de fusión"],
  },
  {
    id: "typescript",
    titulo: "TypeScript para proyectos reales",
    categoria: "desarrollo-web",
    nivel: "intermedio",
    horas: 24,
    texto: "Tipos, interfaces y genéricos para escribir JavaScript que se puede mantener.",
    temario: ["Tipos básicos e inferencia", "Interfaces, uniones y genéricos", "TypeScript dentro de React"],
  },
  {
    id: "node",
    titulo: "Backend con Node.js y Express",
    categoria: "desarrollo-web",
    nivel: "intermedio",
    horas: 40,
    texto: "Diseña y publica una API REST con autenticación y una base de datos real.",
    temario: ["Rutas, controladores y middleware", "Autenticación con tokens", "Conexión a base de datos"],
  },
  {
    id: "accesibilidad",
    titulo: "Accesibilidad web en la práctica",
    categoria: "desarrollo-web",
    nivel: "avanzado",
    horas: 16,
    texto: "Audita y corrige sitios reales según WCAG 2.2: teclado, lectores de pantalla y contraste.",
    temario: ["Criterios WCAG 2.2 AA", "Navegación por teclado y foco", "Auditoría con herramientas automáticas"],
  },
  {
    id: "sql",
    titulo: "SQL y bases de datos desde cero",
    categoria: "datos-ia",
    nivel: "principiante",
    horas: 22,
    texto: "Consulta, une y resume datos con SQL, y aprende a modelar tablas con criterio.",
    temario: ["SELECT, filtros y ordenamiento", "JOIN y agregaciones", "Modelado y normalización"],
  },
  {
    id: "python",
    titulo: "Python para análisis de datos",
    categoria: "datos-ia",
    nivel: "intermedio",
    horas: 32,
    texto: "Pandas, gráficos y un proyecto completo de análisis de principio a fin.",
    temario: ["Python y notebooks", "Pandas: limpieza y transformación", "Visualización y reporte final"],
  },
  {
    id: "ia-generativa",
    titulo: "Introducción a la IA generativa",
    categoria: "datos-ia",
    nivel: "principiante",
    horas: 12,
    texto: "Qué puede y qué no puede hacer un modelo de lenguaje, y cómo usarlo con criterio en tu trabajo.",
    temario: ["Cómo funcionan los modelos de lenguaje", "Escribir buenas instrucciones", "Uso responsable y verificación"],
  },
  {
    id: "figma",
    titulo: "Diseño de interfaces con Figma",
    categoria: "diseno",
    nivel: "principiante",
    horas: 16,
    texto: "Componentes, variables y auto layout para diseñar pantallas ordenadas y reutilizables.",
    temario: ["Frames y auto layout", "Componentes y variantes", "Variables y estilos"],
  },
  {
    id: "usabilidad",
    titulo: "Pruebas de usabilidad y research",
    categoria: "diseno",
    nivel: "avanzado",
    horas: 20,
    texto: "Planifica, ejecuta y sintetiza pruebas con usuarios para decidir con evidencia.",
    temario: ["Plan de pruebas y reclutamiento", "Moderación y observación", "Síntesis y recomendaciones"],
  },
  {
    id: "seo",
    titulo: "SEO y contenido para emprendedores",
    categoria: "negocios",
    nivel: "principiante",
    horas: 14,
    texto: "Haz que tu negocio aparezca en buscadores con contenido útil y una web bien estructurada.",
    temario: ["Palabras clave e intención de búsqueda", "SEO técnico esencial", "Calendario de contenido"],
  },
  {
    id: "finanzas",
    titulo: "Finanzas para emprendedores digitales",
    categoria: "negocios",
    nivel: "intermedio",
    horas: 16,
    texto: "Precios, costos y flujo de caja para que tu proyecto sea rentable desde el inicio.",
    temario: ["Estructura de costos y precios", "Flujo de caja mensual", "Indicadores clave de un negocio digital"],
  },
];

export const CURSOS_DESTACADOS = CURSOS.filter((curso) => curso.destacado);
export const CURSOS_ADICIONALES = CURSOS.filter((curso) => !curso.destacado);

/* Fechas de inicio en hora de Lima (UTC−5, sin horario de verano) escritas de
   forma explícita para que la cuenta regresiva sea la misma en cualquier zona
   horaria. «cursoId» enlaza con CURSOS: el título se toma de ahí.
   Son fechas de ejemplo; reemplázalas por las reales cuando se confirmen. */
const INICIOS = [
  { cursoId: "frontend", fecha: "2026-11-02T19:00:00-05:00" },
  { cursoId: "datos", fecha: "2026-11-16T19:00:00-05:00" },
  { cursoId: "ux-ui", fecha: "2026-11-30T20:00:00-05:00" },
  { cursoId: "react", fecha: "2026-12-07T19:00:00-05:00" },
  { cursoId: "sql", fecha: "2027-01-11T19:00:00-05:00" },
  { cursoId: "python", fecha: "2027-01-25T19:00:00-05:00" },
];

const FORMATO_FECHA = new Intl.DateTimeFormat("es-PE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "America/Lima",
});
const FORMATO_HORA = new Intl.DateTimeFormat("es-PE", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Lima",
});
const FORMATO_MES = new Intl.DateTimeFormat("es-PE", { month: "short", timeZone: "America/Lima" });
const FORMATO_DIA = new Intl.DateTimeFormat("es-PE", { day: "2-digit", timeZone: "America/Lima" });

const mayuscula = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

export const PROXIMOS_INICIOS = INICIOS.map(({ cursoId, fecha }) => {
  const instante = new Date(fecha);
  const curso = CURSOS.find((c) => c.id === cursoId);
  return {
    cursoId,
    curso: curso.titulo,
    fecha,
    dia: FORMATO_DIA.format(instante),
    mes: FORMATO_MES.format(instante).replace(".", ""),
    texto: `${mayuscula(FORMATO_FECHA.format(instante))} · ${FORMATO_HORA.format(instante)} (hora de Lima)`,
  };
});

export function datosDelCurso(curso) {
  return `${CATEGORIAS[curso.categoria]} · ${NIVELES[curso.nivel]} · ${curso.horas} horas`;
}

export function totalHoras() {
  return CURSOS.reduce((suma, curso) => suma + curso.horas, 0);
}
