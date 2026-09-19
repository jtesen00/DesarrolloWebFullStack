/* ============================================================
   Wayra Academy — Interacción (Semana 3)
   Primera capa de JavaScript del proyecto.

   Dos interacciones, un solo archivo:
     A. Filtrado en vivo del catálogo  → explorador-cursos.html
     B. Validación y ruta del asesor   → asesor-virtual.html

   Reglas del equipo para esta capa:
   · const por defecto; let solo donde el valor cambia de verdad.
   · Cada bloque comprueba que sus elementos existan antes de engancharse,
     porque el mismo archivo se carga en páginas distintas.
   · Mejora progresiva: si este archivo no se ejecuta, las dos páginas
     siguen funcionando como en la Semana 2. Nada se oculta desde el HTML.
   · Los datos se leen de atributos data-*, nunca del texto visible.
   · Nada de innerHTML: el contenido se escribe con textContent y nodos.
   ============================================================ */

"use strict";

/* ============================================================
   A. Explorador de cursos — filtrado en vivo
   ============================================================ */

function iniciarFiltrado() {
  const categoria = document.getElementById("filtro-categoria");
  const nivel = document.getElementById("filtro-nivel");
  const duracion = document.getElementById("filtro-duracion");
  const busqueda = document.getElementById("busqueda-curso");
  const aviso = document.getElementById("aviso-resultados");

  // No estamos en el explorador: no hay nada que enganchar.
  if (!categoria || !nivel || !duracion || !busqueda || !aviso) return;

  // querySelectorAll y no getElementById: son cinco elementos que comparten
  // clase y ninguno tiene id. querySelector devolvería solo el primero.
  const cursos = document.querySelectorAll(".curso");

  // Los tramos de duración viven aquí y no repartidos por el código, para
  // que cambiar uno sea tocar una sola línea.
  const RANGOS = {
    corta: (horas) => horas < 10,
    media: (horas) => horas >= 10 && horas <= 30,
    larga: (horas) => horas > 30,
  };

  function coincide(curso, filtros) {
    if (filtros.categoria !== "todas" && curso.dataset.categoria !== filtros.categoria) {
      return false;
    }
    if (filtros.nivel !== "todos" && curso.dataset.nivel !== filtros.nivel) {
      return false;
    }
    if (filtros.duracion !== "cualquiera") {
      // Number() y no parseInt(): si el atributo estuviera mal escrito
      // preferimos un NaN evidente a un número leído a medias.
      const horas = Number(curso.dataset.horas);
      if (!RANGOS[filtros.duracion](horas)) return false;
    }
    if (filtros.texto !== "") {
      const titulo = curso.querySelector(".curso__titulo").textContent.toLowerCase();
      if (!titulo.includes(filtros.texto)) return false;
    }
    return true;
  }

  // Resalta los filtros que no están en su valor por defecto. Es el cambio
  // de estilo: explica por qué la lista está recortada.
  function marcarFiltrosActivos(filtros) {
    const activos = {
      "filtro-categoria": filtros.categoria !== "todas",
      "filtro-nivel": filtros.nivel !== "todos",
      "filtro-duracion": filtros.duracion !== "cualquiera",
      "busqueda-curso": filtros.texto !== "",
    };
    for (const id of Object.keys(activos)) {
      const campo = document.getElementById(id).closest(".filtros__campo");
      campo.classList.toggle("filtros__campo--activo", activos[id]);
    }
  }

  function aplicarFiltros() {
    const filtros = {
      categoria: categoria.value,
      nivel: nivel.value,
      duracion: duracion.value,
      texto: busqueda.value.trim().toLowerCase(),
    };

    // La única variable que cambia de valor: por eso es let y no const.
    let visibles = 0;

    // El bucle existe porque hay cinco tarjetas que evaluar con la misma
    // regla. Sin él habría que repetir la comparación cinco veces.
    for (const curso of cursos) {
      const pasa = coincide(curso, filtros);
      // hidden y no style.display: el atributo saca la tarjeta también del
      // árbol de accesibilidad, así que el lector de pantalla no la anuncia.
      curso.hidden = !pasa;
      if (pasa) visibles = visibles + 1;
    }

    // El mensaje se escribe una sola vez, al salir del bucle.
    if (visibles === 0) {
      aviso.textContent = "Ningún curso coincide con estos filtros. Prueba a quitar alguno.";
      aviso.classList.add("resultados--vacio");
    } else {
      aviso.textContent = visibles === 1 ? "1 curso coincide" : visibles + " cursos coinciden";
      aviso.classList.remove("resultados--vacio");
    }

    marcarFiltrosActivos(filtros);
  }

  // change en los <select>: se dispara igual con ratón que con teclado.
  // input en el buscador: reacciona a cada tecla, y también al pegar o
  // borrar con el ratón, cosa que keyup no garantiza.
  categoria.addEventListener("change", aplicarFiltros);
  nivel.addEventListener("change", aplicarFiltros);
  duracion.addEventListener("change", aplicarFiltros);
  busqueda.addEventListener("input", aplicarFiltros);

  // Una pasada al cargar: deja el recuento correcto aunque el navegador
  // recuerde los valores de los filtros de una visita anterior.
  aplicarFiltros();
}

/* ============================================================
   B. Asesor virtual — validación de las seis preguntas y ruta
   ============================================================ */

function iniciarAsesor() {
  const boton = document.getElementById("ver-ruta");
  const aviso = document.getElementById("aviso-ruta");
  const ruta = document.getElementById("ruta-completa");

  if (!boton || !aviso || !ruta) return;

  const grupos = document.querySelectorAll(".test__pregunta, .test__final");

  // Recomendación parcial que calcula el CSS con :has() a partir de la
  // pregunta 6. Es el suelo sin JavaScript; cuando la ruta completa cruza
  // las seis respuestas, esta sobra y además puede contradecirla (quien
  // tiene experiencia previa no debe empezar por el curso inicial).
  const parciales = document.querySelector(".test__resultados");

  // Curso base por área. El nivel decide si en desarrollo web se empieza
  // por Frontend o se salta directamente a React.
  const CURSOS = {
    "desarrollo-web": {
      inicial: "Frontend con HTML5, CSS3 y JavaScript",
      avanzado: "React desde cero",
    },
    "datos-ia": {
      inicial: "Fundamentos de análisis de datos",
      avanzado: "Fundamentos de análisis de datos",
    },
    diseno: {
      inicial: "Diseño UX/UI para producto digital",
      avanzado: "Diseño UX/UI para producto digital",
    },
    negocios: {
      inicial: "Marketing digital para emprendedores",
      avanzado: "Marketing digital para emprendedores",
    },
  };

  const RITMO = {
    poco: "unas 8 semanas, dedicándole menos de 3 horas por semana",
    medio: "unas 5 semanas, dedicándole de 3 a 6 horas por semana",
    mucho: "unas 3 semanas, dedicándole más de 6 horas por semana",
  };

  function leerRespuestas() {
    const respuestas = {};
    const faltan = [];

    // El bucle recorre los seis grupos de preguntas. Es el caso real de
    // repetición: la misma comprobación, seis veces.
    for (const [i, grupo] of grupos.entries()) {
      const marcado = grupo.querySelector("input[type='radio']:checked");
      if (marcado === null) {
        faltan.push(i + 1);
        grupo.classList.add("test__grupo--falta");
      } else {
        respuestas[marcado.name] = marcado.value;
        grupo.classList.remove("test__grupo--falta");
      }
    }
    return { respuestas, faltan };
  }

  // textContent y nodos en vez de innerHTML: el nombre del curso va en un
  // <strong> real, creado aparte.
  function escribirRuta(respuestas) {
    const area = CURSOS[respuestas.p1];
    const curso = respuestas.p3 === "experiencia" ? area.avanzado : area.inicial;

    const destacado = document.createElement("strong");
    destacado.textContent = curso;

    ruta.textContent = "Tu ruta: empieza por ";
    ruta.append(destacado);
    ruta.append(". Al ritmo que indicaste, te llevaría " + RITMO[respuestas.p2] + ".");
    ruta.hidden = false;
    parciales.hidden = true;
  }

  boton.addEventListener("click", () => {
    const { respuestas, faltan } = leerRespuestas();

    if (faltan.length > 0) {
      // Camino de error: el aviso dice exactamente qué pregunta falta.
      aviso.textContent = faltan.length === 1
        ? "Te falta responder la pregunta " + faltan[0] + "."
        : "Te faltan por responder las preguntas " + faltan.join(", ") + ".";
      aviso.classList.add("test__aviso-validacion--error");
      ruta.hidden = true;
      parciales.hidden = false;
      return;
    }

    // Camino correcto.
    aviso.textContent = "Listo: cruzamos tus seis respuestas.";
    aviso.classList.remove("test__aviso-validacion--error");
    escribirRuta(respuestas);
  });

  // Al responder una pregunta que estaba marcada como pendiente, el aviso
  // rojo desaparece de inmediato: corregir un error no debería obligar a
  // volver a pulsar el botón para ver que ya está corregido.
  for (const grupo of grupos) {
    grupo.addEventListener("change", () => {
      grupo.classList.remove("test__grupo--falta");
    });
  }
}

iniciarFiltrado();
iniciarAsesor();
