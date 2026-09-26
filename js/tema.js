/* ============================================================
   Wayra Academy — Selector de tema claro/oscuro (Semana 4, RF1)

   Por qué es un archivo aparte y no un bloque más de interaccion.js:
   este se carga en <head> SIN defer. Así la clase .tema-oscuro queda
   puesta en <html> antes de que el navegador pinte el primer cuadro, y
   quien eligió el tema oscuro no ve un destello blanco al cambiar de
   página. interaccion.js, con defer, llegaría tarde para eso.

   Reglas que sigue:
   · classList para el cambio visual: JavaScript no toca ningún color.
     Todos los colores del tema oscuro viven en estilos.css como tokens.
   · Mejora progresiva: el botón lleva la clase .solo-con-js y este
     archivo pone .con-js en <html> antes de pintar. Sin JavaScript no
     aparece un botón que no hace nada; la página se ve en el tema claro
     de siempre. Con JavaScript aparece desde el primer cuadro, sin que el
     encabezado salte al cargar.
   · localStorage puede fallar (navegación privada, almacenamiento
     bloqueado): cada acceso va en try/catch y la página funciona igual,
     solo que sin recordar la elección.

   Que el tema sea el mismo en todas las páginas (corrección):
   · Con un servidor (http://), las 4 páginas comparten localStorage.
   · Abiertas con doble clic (file://), Firefox da a CADA archivo su
     propio localStorage: lo que guarda index.html no lo ve
     explorador-cursos.html. Por eso, en file:// el tema viaja también
     en la URL de los enlaces internos (?tema=oscuro), que es lo único
     que sobrevive al cambio de archivo.
   · Al volver con «Atrás», el navegador puede restaurar la página desde
     su caché (bfcache) tal como quedó, sin volver a ejecutar este
     archivo. pageshow la vuelve a sincronizar.
   · Con el sitio abierto en dos pestañas, el evento storage avisa a la
     otra del cambio.
   ============================================================ */

"use strict";

const CLAVE_TEMA = "wayra-tema";
const CLASE_OSCURA = "tema-oscuro";
const ES_ARCHIVO_LOCAL = location.protocol === "file:";

function leerTemaGuardado() {
  try {
    return localStorage.getItem(CLAVE_TEMA);
  } catch {
    return null;
  }
}

function guardarTema(valor) {
  try {
    localStorage.setItem(CLAVE_TEMA, valor);
  } catch {
    // Sin almacenamiento el cambio funciona igual; solo no se recuerda.
  }
}

// En file:// el tema puede llegar en la URL desde la página anterior.
function leerTemaDeUrl() {
  if (!ES_ARCHIVO_LOCAL) return null;
  const valor = new URLSearchParams(location.search).get("tema");
  return valor === "oscuro" || valor === "claro" ? valor : null;
}

// Al cargar: lo que trae la URL (file://), lo guardado, y si el usuario
// nunca eligió, la preferencia del sistema operativo. La URL va primero
// porque en Firefox + file:// lo guardado en ESTE archivo puede ser viejo.
function temaAlCargarOscuro() {
  const deUrl = leerTemaDeUrl();
  if (deUrl !== null) {
    guardarTema(deUrl);
    return deUrl === "oscuro";
  }
  return temaGuardadoOscuro();
}

// Al volver con «Atrás» o al cambiar en otra pestaña: manda lo guardado,
// que es la elección más reciente. La URL de una página restaurada es la
// de cuando se dejó, así que ahí sería la vieja.
function temaGuardadoOscuro() {
  const guardado = leerTemaGuardado();
  if (guardado !== null) return guardado === "oscuro";
  const deUrl = leerTemaDeUrl();
  if (deUrl !== null) return deUrl === "oscuro";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Escribe ?tema= en cada enlace a otra página del sitio y en la URL
// actual (así también sobrevive a recargar). Solo en file://: con un
// servidor, localStorage ya basta y las URLs quedan limpias.
function propagarTemaEnEnlaces(oscuro) {
  const valor = oscuro ? "oscuro" : "claro";

  for (const enlace of document.querySelectorAll("a[href]")) {
    // Los enlaces a una sección de la misma página (#pie) no cambian.
    if (enlace.getAttribute("href").startsWith("#")) continue;
    const destino = new URL(enlace.href);
    if (destino.protocol !== "file:" || !destino.pathname.endsWith(".html")) continue;
    destino.searchParams.set("tema", valor);
    enlace.href = destino.href;
  }

  const actual = new URL(location.href);
  actual.searchParams.set("tema", valor);
  history.replaceState(history.state, "", actual.href);
}

// Un solo lugar que pone el tema en pantalla: clase, estado del botón y
// enlaces. Lo usan la carga, el clic, pageshow y storage.
function aplicarTema(oscuro) {
  document.documentElement.classList.toggle(CLASE_OSCURA, oscuro);

  // Mientras el <head> se procesa, el botón y los enlaces aún no existen.
  if (document.readyState === "loading") return;

  const boton = document.getElementById("cambiar-tema");
  if (boton) boton.setAttribute("aria-pressed", String(oscuro));
  if (ES_ARCHIVO_LOCAL) propagarTemaEnEnlaces(oscuro);
}

function iniciarSelectorTema() {
  const boton = document.getElementById("cambiar-tema");
  const raiz = document.documentElement;

  aplicarTema(raiz.classList.contains(CLASE_OSCURA));
  if (!boton) return;

  boton.addEventListener("click", () => {
    const oscuro = !raiz.classList.contains(CLASE_OSCURA);
    guardarTema(oscuro ? "oscuro" : "claro");
    aplicarTema(oscuro);
  });
}

// 1. Antes de pintar: las clases en <html>. .con-js muestra desde el
//    primer cuadro los controles que dependen de JavaScript (ver CSS).
document.documentElement.classList.add("con-js");
aplicarTema(temaAlCargarOscuro());

// 2. Con el HTML ya construido: botón y enlaces.
document.addEventListener("DOMContentLoaded", iniciarSelectorTema);

// 3. Página restaurada desde la caché de «Atrás»/«Adelante».
window.addEventListener("pageshow", (evento) => {
  if (evento.persisted) aplicarTema(temaGuardadoOscuro());
});

// 4. El tema cambió en otra pestaña del mismo sitio.
window.addEventListener("storage", (evento) => {
  if (evento.key === CLAVE_TEMA) aplicarTema(temaGuardadoOscuro());
});
