/* ============================================================
   Wayra Academy — Interacción (Semanas 3 y 4)
   Primera capa de JavaScript del proyecto.

   Tres interacciones, un solo archivo:
     A. Filtrado en vivo del catálogo  → explorador-cursos.html
     B. Formulario validado del asesor → asesor-virtual.html
     C. Modal «Ingresar o registrarse» → las cuatro páginas
   El selector de tema vive en js/tema.js (ver por qué en ese archivo).

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
   B. Asesor virtual — formulario validado y ruta
   Semana 3: validación a mano con un click.
   Semana 4 (RF2): el test es un <form> real. Se valida con la
   Constraint Validation API (required, minlength, pattern y validity)
   y se responde a submit e input.
   ============================================================ */

function iniciarAsesor() {
  const formulario = document.getElementById("form-asesor");
  const aviso = document.getElementById("aviso-ruta");
  const ruta = document.getElementById("ruta-completa");
  const nombre = document.getElementById("nombre-asesor");
  const errorNombre = document.getElementById("nombre-error");

  if (!formulario || !aviso || !ruta || !nombre || !errorNombre) return;

  // Las reglas (required, minlength, pattern) están escritas en el HTML.
  // Sin JavaScript, el navegador las hace cumplir con sus propios
  // globos. Con JavaScript se apagan esos globos y los mensajes los
  // escribe la página, en español claro y junto al campo.
  formulario.noValidate = true;

  // Hasta el primer envío no se muestra ningún error: nadie debería ver
  // "escribe tu nombre" antes de haber llegado a ese campo.
  let intentoEnvio = false;

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

  // Recorre los seis grupos y pregunta a la Constraint Validation API si
  // falta alguno. En cada grupo el primer radio lleva required, y con eso
  // el navegador considera obligatorio todo el grupo (mismo name).
  function revisarPreguntas() {
    const respuestas = {};
    const faltan = [];

    // El bucle recorre los seis grupos de preguntas. Es el caso real de
    // repetición: la misma comprobación, seis veces.
    for (const [i, grupo] of grupos.entries()) {
      const primero = grupo.querySelector("input[type='radio']");
      const falta = primero.validity.valueMissing;
      grupo.classList.toggle("test__grupo--falta", falta);
      if (falta) {
        faltan.push(i + 1);
      } else {
        // RadioNodeList.value: el valor del radio marcado en ese grupo.
        respuestas[primero.name] = formulario.elements[primero.name].value;
      }
    }
    return { respuestas, faltan };
  }

  // Traduce el objeto validity del campo a un mensaje concreto. Cada
  // propiedad dice qué regla del HTML se incumplió.
  function mensajeNombre() {
    const estado = nombre.validity;
    if (estado.valueMissing) return "Escribe tu nombre para personalizar la ruta.";
    if (estado.tooShort) return "El nombre debe tener al menos " + nombre.minLength + " letras.";
    if (estado.patternMismatch) return "Empieza con una letra y usa solo letras, espacios, apóstrofo o guion.";
    return "";
  }

  function revisarNombre() {
    const mensaje = mensajeNombre();
    errorNombre.textContent = mensaje;
    // aria-invalid hace que el lector de pantalla diga "no válido" al
    // enfocar el campo; el mensaje le llega por aria-describedby.
    nombre.setAttribute("aria-invalid", String(mensaje !== ""));
    return mensaje === "";
  }

  // Un solo mensaje que resume todo lo pendiente, bajo el botón.
  function escribirAviso(faltan, nombreValido) {
    const pendientes = [];
    if (faltan.length === 1) pendientes.push("la pregunta " + faltan[0]);
    if (faltan.length > 1) pendientes.push("las preguntas " + faltan.join(", "));
    if (!nombreValido) pendientes.push("tu nombre");

    if (pendientes.length === 0) {
      aviso.textContent = "Todo completo. Pulsa «Ver mi ruta completa».";
      aviso.classList.remove("test__aviso-validacion--error");
      return;
    }
    aviso.textContent = "Te falta completar " + pendientes.join(" y ") + ".";
    aviso.classList.add("test__aviso-validacion--error");
  }

  // textContent y nodos en vez de innerHTML: el nombre del curso va en un
  // <strong> real, creado aparte. Y el nombre que escribió el usuario
  // entra como texto, nunca como HTML.
  function escribirRuta(respuestas) {
    const area = CURSOS[respuestas.p1];
    const curso = respuestas.p3 === "experiencia" ? area.avanzado : area.inicial;

    const destacado = document.createElement("strong");
    destacado.textContent = curso;

    ruta.textContent = nombre.value.trim() + ", tu ruta: empieza por ";
    ruta.append(destacado);
    ruta.append(". Al ritmo que indicaste, te llevaría " + RITMO[respuestas.p2] + ".");
    ruta.hidden = false;
    parciales.hidden = true;
  }

  formulario.addEventListener("submit", (evento) => {
    // La ruta se calcula aquí mismo: el formulario no se envía a ningún
    // servidor y la página no se recarga.
    evento.preventDefault();
    intentoEnvio = true;

    const { respuestas, faltan } = revisarPreguntas();
    const nombreValido = revisarNombre();

    // checkValidity() repasa todas las reglas del formulario de una vez.
    if (!formulario.checkValidity()) {
      escribirAviso(faltan, nombreValido);
      ruta.hidden = true;
      parciales.hidden = false;
      // El foco va al primer campo pendiente: con teclado se corrige sin
      // tener que buscarlo. :invalid lo marca el propio navegador.
      formulario.querySelector(":invalid").focus();
      return;
    }

    // Camino correcto.
    aviso.textContent = "Listo: cruzamos tus seis respuestas.";
    aviso.classList.remove("test__aviso-validacion--error");
    escribirRuta(respuestas);
  });

  // input se dispara con cada tecla en el nombre y con cada radio que se
  // marca, con ratón o con flechas. Un solo escuchador en el <form>
  // atiende a los 20 campos (delegación): el evento sube desde el campo.
  formulario.addEventListener("input", (evento) => {
    const grupo = evento.target.closest(".test__pregunta, .test__final");
    if (grupo) grupo.classList.remove("test__grupo--falta");

    // Antes del primer envío no se corrige a nadie mientras escribe.
    if (!intentoEnvio) return;

    // Después sí: el mensaje se actualiza en vivo, y desaparece en cuanto
    // el dato queda bien, sin volver a pulsar el botón.
    const nombreValido = evento.target === nombre ? revisarNombre() : nombre.validity.valid;
    const faltan = [];
    for (const [i, g] of grupos.entries()) {
      if (g.querySelector("input[type='radio']").validity.valueMissing) faltan.push(i + 1);
    }
    escribirAviso(faltan, nombreValido);
  });
}

/* ============================================================
   C. Modal «Ingresar o registrarse» (Semana 4, RF3)
   <dialog> nativo + Web Animations API para la entrada.
   ============================================================ */

function iniciarModal() {
  const abrir = document.getElementById("abrir-acceso");
  const modal = document.getElementById("modal-acceso");

  if (!abrir || !modal) return;

  // El botón es visible desde el primer cuadro si hay JavaScript
  // (.solo-con-js). showModal existe en todo navegador actual; si
  // faltara, se oculta para no dejar un botón que no hace nada.
  if (typeof modal.showModal !== "function") {
    abrir.closest("li").hidden = true;
    return;
  }

  // Quien pidió al sistema reducir el movimiento no recibe animación. La
  // media query del CSS no alcanza aquí: frena animaciones CSS, no las
  // que crea element.animate().
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  const ENTRADA = [
    { opacity: 0, transform: "translateY(1.5rem) scale(0.96)" },
    { opacity: 1, transform: "translateY(0) scale(1)" },
  ];
  const TIEMPO = { duration: 280, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" };

  abrir.addEventListener("click", () => {
    // Primero se abre y después se anima. showModal() mueve el foco
    // dentro del modal en el acto, así que la animación nunca bloquea:
    // se puede pulsar Esc o Tab desde el primer cuadro.
    modal.showModal();

    if (menosMovimiento.matches) return;
    modal.animate(ENTRADA, TIEMPO);
    // El velo de fondo aparece con un fundido, a la par del panel. Es un
    // extra: si un navegador no admite animar ::backdrop, el modal ya
    // está abierto y animado, y el error no debe llegar a la consola.
    try {
      modal.animate({ opacity: [0, 1] }, { ...TIEMPO, pseudoElement: "::backdrop" });
    } catch {
      // Sin fundido del velo: aparece de golpe, que es lo normal.
    }
  });

  // Botones de cierre: la × y «Entendido».
  for (const boton of modal.querySelectorAll("[data-cerrar-modal]")) {
    boton.addEventListener("click", () => modal.close());
  }

  // Clic en el velo. El relleno está en .modal__caja, así que el propio
  // <dialog> solo es el destino del clic cuando se pulsa fuera del panel.
  // Se exige que el botón se haya presionado Y soltado sobre el velo: si
  // alguien selecciona texto del panel y suelta el ratón afuera, el
  // navegador también emite un click sobre el <dialog>, y no debe cerrarse.
  let presionadoEnVelo = false;
  modal.addEventListener("pointerdown", (evento) => {
    presionadoEnVelo = evento.target === modal;
  });
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal && presionadoEnVelo) modal.close();
    presionadoEnVelo = false;
  });

  // Esc también dispara close. Al cerrarse por cualquier vía, el foco
  // vuelve al botón que lo abrió: quien usa teclado no pierde su lugar.
  modal.addEventListener("close", () => abrir.focus());
}

iniciarFiltrado();
iniciarAsesor();
iniciarModal();
