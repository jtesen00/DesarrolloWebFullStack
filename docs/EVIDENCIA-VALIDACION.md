# Wayra Academy — Evidencia de validación del primer prototipo

Documento de salida del laboratorio. Acompaña a `index.html` y `css/estilos.css`.
Cada fila enlaza una decisión de la Guía de Trabajo Grupal N°1 con la comprobación que la demuestra.

---

## 1. Cómo ejecutar las validaciones

**Validador HTML del W3C**
1. Entrar a https://validator.w3.org/#validate_by_upload
2. Subir `index.html` y ejecutar.
3. Capturar la pantalla completa con el resultado. Se espera: *Document checking completed. No errors or warnings to show.*

**axe DevTools**
1. Abrir `index.html` en Chrome o Edge (usar Live Server de VS Code, no `file://`, para que carguen las fuentes).
2. Abrir DevTools → pestaña **axe DevTools** → *Scan all of my page*.
3. Capturar el resumen de resultados y, además, la vista **Structure / Landmarks**.

**Navegación por teclado**
1. Hacer clic en la barra de direcciones y presionar `Tab` repetidamente.
2. Grabar o fotografiar el recorrido completo del foco.

---

## 2. Las tres decisiones técnicas y su evidencia

| Decisión | Dónde se ve en el código | Comprobación | Resultado esperado |
|---|---|---|---|
| `<section>` que agrupa tres `<article>` en la zona de experiencias | `index.html`, líneas del bloque `<section id="experiencias">` | axe DevTools, categoría *Structure* | Sin errores de estructura semántica. Cada `<article>` aparece con su propio nombre accesible gracias a `aria-labelledby` |
| Un único `<main>` con jerarquía de encabezados consistente | Un solo `<h1>` en `.bienvenida`; un `<h2>` por cada experiencia | Validador W3C + auditoría de encabezados en axe | Sin advertencias. No hay saltos de nivel (h1 → h2, nunca h1 → h3) |
| `<nav>` anidado dentro de `<header>` | `index.html`, el `<nav aria-label="Navegación principal">` está dentro de `<header>` | axe DevTools, vista *Landmarks* | Un solo landmark `banner`, un solo `navigation`, un solo `main`, un solo `contentinfo`. Sin advertencias de landmarks duplicados ni anidamiento inválido |

### Argumento de defensa, en una línea cada uno

1. **`section` + `article`:** el buscador, el reproductor y el test son herramientas interactivas independientes con su propia lógica; cada una podría extraerse y reutilizarse en otra página sin perder sentido, que es exactamente el criterio de `<article>`. `<section>` las agrupa porque comparten un tema, no una función.
2. **`main` y encabezados:** HTML5 admite un solo contenido principal visible; el `h1` describe la página completa y cada `h2` describe una experiencia, de modo que un lector de pantalla puede saltar entre las tres con la tecla `H` sin encontrar niveles omitidos.
3. **`nav` dentro de `header`:** el encabezado es el landmark introductorio de la página y agrupa identidad y navegación principal. HTML5 permite la anidación y el rol `banner` no se pierde por contener un `navigation`.

---

## 3. Los tres criterios de accesibilidad, verificados

### Criterio 1 — Contraste mínimo 4.5:1 en texto normal

Todas las combinaciones de la paleta que el CSS realmente usa fueron medidas. El valor más bajo entre ellas es 6.08:1 (`--color-accion` sobre `--color-superficie`, el botón secundario), por encima del mínimo exigido. `--color-accion` sobre `--color-papel` da 5.61:1 pero ningún selector usa esa combinación —no vale citarla como "el mínimo de la página" porque no se renderiza en ningún lado.

| Combinación | Uso | Contraste |
|---|---|---|
| `#1B2A4A` sobre `#F4F6F8` | Texto principal sobre el fondo | 13.13:1 |
| `#1B2A4A` sobre `#FFFFFF` | Texto dentro de las tarjetas | 14.22:1 |
| `#FFFFFF` sobre `#1B2A4A` | Encabezado y pie de página | 14.22:1 |
| `#C7D2E0` sobre `#1B2A4A` | Eslogan y copyright | 9.29:1 |
| `#FFFFFF` sobre `#C0006B` | Botón "Ver cursos disponibles" | 6.08:1 |
| `#C0006B` sobre `#FFFFFF` | Botones de las tarjetas | 6.08:1 |
| `#47566F` sobre `#F4F6F8` | Bajada de la sección | 6.85:1 |
| `#F2B705` sobre `#1B2A4A` | Títulos del pie de página | 7.82:1 |

El amarillo `#F2B705` nunca se usa como color de texto sobre fondo claro: aparece solo como bloque sólido y como subrayado. Verificar cada fila en https://webaim.org/resources/contrastchecker/ y adjuntar una captura.

### Criterio 2 — Texto alternativo en todas las imágenes

| Archivo | `alt` redactado |
|---|---|
| `explorador-cursos.svg` | Buscador de cursos con los filtros de categoría, nivel y duración activos, mostrando cinco cursos comparables con su temario. |
| `clase-muestra.svg` | Miniatura de una clase muestra en video, con el control de reproducción y la duración de la lección visibles. |
| `asesor-virtual.svg` | Pantalla del test de asesor virtual con una pregunta sobre intereses y cuatro opciones de respuesta. |
| `logo-wayra.svg` | `alt=""` intencional: el logotipo es decorativo porque el nombre "Wayra Academy" ya está como texto al lado. Anunciarlo sería una repetición. |

Los tres `alt` describen la **función** de cada experiencia, no el aspecto de la captura. Este es el punto que se sustenta.

### Criterio 3 — Navegación completa por teclado con foco visible

- Todo elemento interactivo recibe `outline: 3px solid #C0006B` con `outline-offset: 3px` mediante `:focus-visible`, incluidos los controles nuevos (`<select>`, `<input type="radio">`, `<summary>`), no solo enlaces y botones.
- Se agregó un enlace **"Saltar al contenido principal"** que aparece al presionar `Tab` por primera vez y permite omitir los cinco enlaces del menú, en `index.html` y en las tres páginas de experiencia.
- Los tres botones de las tarjetas son ahora `<a href="...">` que navegan a una página real (ver ajuste 5); siguen siendo alcanzables con `Tab` y, al navegar, se activan con `Enter` como cualquier enlace.
- El interruptor del menú hamburguesa es un `<input type="checkbox">` real: alcanzable con `Tab`, se activa con la barra espaciadora, sin JavaScript.
- En las páginas nuevas: los `<select>` de filtros se abren y se recorren con teclado de forma nativa; cada `<summary>` de "Ver temario" se activa con `Enter` estando enfocado; cada grupo de radios del test se recorre con las flechas una vez enfocado el primero, comportamiento 100% nativo del navegador.

**Orden de foco esperado desde 40em (tablet/laptop/desktop, menú siempre visible), en `index.html`:** saltar al contenido → 5 enlaces del menú → "Ver cursos disponibles" → Explorar cursos → Ver clase gratis → Hacer el test → enlaces del pie.

**Orden de foco esperado por debajo de 40em (celular, menú colapsado):** saltar al contenido → interruptor de menú (los 5 enlaces solo entran al orden de tabulación cuando el menú está abierto, porque `display: none` los saca de la página para el teclado) → "Ver cursos disponibles" → Explorar cursos → Ver clase gratis → Hacer el test → enlaces del pie.

**En cada página de experiencia:** saltar al contenido → menú (igual que arriba) → "← Volver a Wayra Academy" → los controles propios de la página (los 3 `<select>` en el explorador; el `<video controls>` en la clase muestra — el foco entra al reproductor como un solo control compuesto; los grupos de radios en el test) → enlaces del pie. Verificado con teclado real (`Tab`, `Enter`, flechas y barra espaciadora) sobre Chromium vía Playwright, sin usar el mouse en ningún paso.

---

## 4. Las tres imágenes: resuelto como ilustración, no como captura

Las tres experiencias no tienen funcionalidad propia todavía (llega en la
etapa con JavaScript), así que no existe una pantalla real que fotografiar.
En vez de dejar el bloque gris o fabricar una captura falsa de algo que no
funciona, se colocaron ilustraciones planas en `img/`:

| Archivo | Qué muestra | Formato |
|---|---|---|
| `img/explorador-cursos.svg` | Tarjetas de curso comparadas lado a lado, barra de filtros y una lupa | `.svg`, viewBox 800 × 500 |
| `img/clase-muestra.svg` | Marco de video con botón de reproducción y barra de progreso | `.svg`, viewBox 800 × 500 |
| `img/asesor-virtual.svg` | Tarjeta de pregunta con barra de avance y cuatro opciones de respuesta | `.svg`, viewBox 800 × 500 |

Proporción 16:10 igual que antes, mismos `width="800" height="500"` en el
`<img>`, mismo `object-fit: cover` en `.tarjeta__medio img`. Los colores de
cada ilustración son los valores hex ya documentados en la sección 1 de
`SISTEMA-DE-DISENO.md` (no valores nuevos inventados). Cuando la etapa de
JavaScript haga funcionar cada experiencia de verdad, estas ilustraciones se
reemplazan por capturas reales en `.webp` — sustitución que solo toca el
`src` del `<img>`, nada más.

---

## 5. Cinco ajustes respecto de la guía, con su motivo

1. **La sección se titula "Experiencias interactivas".** El boceto de la Actividad 4 la llamaba "cursos y talleres" y el resto del documento la llamaba "experiencias". Se unificó en "experiencias" porque es el término que usan las Actividades 1, 3, 6 y 7.
2. **La `<section>` lleva un `<h2>` y cada `<article>` lleva otro `<h2>`.** La guía fijó "h2 en cada article" y eso se respetó al pie de la letra. Como la sección también necesita un título visible, ambos quedan en el mismo nivel: es válido en HTML5 y no genera saltos de jerarquía. La alternativa sería `h2` para la sección y `h3` para cada experiencia; si el docente lo pide así, es un cambio de tres líneas y el argumento del anidamiento se mantiene igual.
3. **Se agregó un menú hamburguesa sin JavaScript.** No estaba en la especificación original, pero "responsive en todos los dispositivos" lo pedía y la Guía de Laboratorio 1 prohíbe JavaScript en esta etapa (sección 17: JS llega en semanas futuras). Se resolvió con una casilla oculta (`:checked` + selector de hermanos) en vez de un botón con `addEventListener`. Ver `SISTEMA-DE-DISENO.md`, sección 3, incluida la limitación de no poder exponer `aria-expanded` sin JS.
4. **Las tres imágenes de experiencia son `.svg` ilustrativas, no `.webp` fotográficas.** Motivo y detalle en la sección 4 de este documento.
5. **Los tres botones de tarjeta pasaron de `<button type="button">` a `<a href="...">`, y las tres experiencias son ahora páginas reales.** La Guía de Trabajo Grupal N°1 (Actividad 3) especificaba el contenido de cada experiencia pero no decía que el clic se quedara sin efecto; el equipo pidió que "hacer clic lleve a donde corresponde". Como el clic ahora navega a otra página, el elemento correcto por la propia regla del sistema de diseño es `<a>`, no `<button>` — un botón que navega estaría mintiendo sobre su propio comportamiento. Las tres páginas nuevas (`explorador-cursos.html`, `clase-muestra.html`, `asesor-virtual.html`) siguen sin una línea de JavaScript: usan `<details>/<summary>` nativo, `<video controls>` nativo y el selector CSS `:has()` para la recomendación del test. Detalle completo en `SISTEMA-DE-DISENO.md`, sección 5.

---

## 6. Actividad 5 — Ejecutar e inspeccionar

Pasos ejecutados sobre `index.html` + `css/estilos.css`. Como comprobación
propia (además de la que debe hacer el equipo con Chrome/Edge y Live Server),
se cargó la página en Chromium sin interfaz vía Playwright, en 375px, 700px
y 1200px de ancho, revisando la consola y las peticiones de red en cada uno:

1. Abrir `index.html` en el navegador (con Live Server, no `file://`, para que carguen las fuentes de Google Fonts).
2. Confirmar visualmente que el CSS se aplica: fondo `--color-papel`, encabezado y pie en `--color-tinta`, tarjetas con sombra de borde y radio grande.
3. Abrir DevTools → Elements/Inspeccionar y ubicar `.navegacion__interruptor`, `.tarjeta`, `.boton--primario`.
4. Cambiar temporalmente `--color-accion` en el inspector y confirmar que botones, bordes y anillo de foco cambian todos juntos (así se demuestra que `:root` es la única fuente de verdad de color).
5. Comparar con el boceto del trabajo grupal.

**Diferencias registradas entre lo previsto y lo implementado:**

- El logo apuntaba a `img/logo-wayra.svg` pero el archivo vivía suelto en la raíz del proyecto — se detectó al inspeccionar la petición de red fallida y se corrigió moviendo el archivo a `img/` (evidencia completa en la Actividad 6, tabla de abajo).
- El menú de navegación no estaba pensado como colapsable en la especificación original; se añadió el patrón de casilla oculta descrito en el ajuste 3 de la sección 5.
- Las tres imágenes nuevas no se veían al cargar la página (se detectó al comparar la captura renderizada contra lo esperado): los `.svg` tenían un error de sintaxis en sus comentarios que el navegador rechazaba. Corrección y verificación en la Actividad 6.

**Resultado de la comprobación en los tres anchos:**

| Ancho | Botón hamburguesa | Lista de navegación | Consola / red |
|---|---|---|---|
| 375px (celular) | Visible, 48×48px | Oculta hasta activar la casilla; clic y barra espaciadora la muestran igual | Sin errores |
| 700px (tablet) | Oculto | Siempre visible, en fila | Sin errores |
| 1200px (desktop) | Oculto | Siempre visible, en fila | Sin errores |

## 7. Actividad 6 — Validar y corregir HTML

| Problema | Causa | Corrección | Resultado |
|---|---|---|---|
| El logo no cargaba (404) | `index.html` referenciaba `img/logo-wayra.svg`, pero el archivo estaba en la raíz del proyecto, no en `img/` | Se creó `img/` y se movió `logo-wayra.svg` ahí | El `<img class="marca__logo">` carga sin error de red |
| Las tres imágenes de experiencia no existían | Nunca se habían generado; `EVIDENCIA-VALIDACION.md` las dejaba como pendiente explícito | Se crearon `explorador-cursos.svg`, `clase-muestra.svg` y `asesor-virtual.svg` en `img/` y se actualizó el `src` de `.webp` a `.svg` en `index.html` | Las tres `<img>` cargan y muestran una ilustración con la proporción 16:10 correcta |
| Las tres imágenes nuevas no se veían: el navegador mostraba el `alt` en vez del dibujo | Los comentarios XML dentro de los `.svg` citaban tokens como `--color-vacio`; XML prohíbe la secuencia `--` dentro de un comentario, así que el parser del navegador rechazaba el archivo entero (`Unexpected token '--'`) | Se reescribieron los comentarios sin el prefijo `--` (`color-vacio` en vez de `--color-vacio`) | Verificado cargando cada `.svg` y `index.html` completo en Chromium (vía Playwright, sin errores de consola ni de red) en 375px, 700px y 1200px de ancho |
| En la pregunta 6 del test, cada radio aparecía en su propia fila, lejos de su etiqueta, en vez de al lado del texto | `.test__opciones` es `display:flex; flex-direction:column`, y el `<input>` y su `<label>` eran hermanos sueltos dentro de ese contenedor: cada uno ocupaba una fila propia en vez de compartirla | Se envolvió cada par input+label en `div.test__opcion` (su propia fila en flex), como ya se hacía con las cinco preguntas anteriores | Verificado visualmente con una captura en Chromium: los cuatro radios quedan alineados con su texto |
| La recomendación del test no aparecía al marcar la pregunta 6 | El selector `#obj-empleo:checked ~ .test__resultados #resultado-empleo` requiere que `.test__resultados` sea hermano directo del radio; al envolver cada opción en `div.test__opcion` (corrección anterior), `.test__resultados` dejó de serlo | Se cambió el selector de hermanos por `:has()`: `.test__final:has(#obj-empleo:checked) #resultado-empleo`, que no depende de esa relación de hermanos | Verificado con Playwright: marcar cada uno de los 4 radios revela su recomendación y oculta las otras tres; navegable solo con teclado (`Tab` + flechas) |
| El título de cada pregunta (`<legend>`) quedaba fuera de la tarjeta blanca, montado sobre el borde superior | Los navegadores posicionan `<legend>` pegado al borde de su `<fieldset>` ignorando el `padding` — es el comportamiento nativo, no un error de CSS; ni siquiera cambiar el `<fieldset>` a `display:flex` lo evitó en Chromium | Se reemplazó `<fieldset>/<legend>` por `<div role="group" aria-labelledby="...">` + `<h2>`, el patrón que WAI-ARIA documenta como equivalente accesible cuando fieldset/legend no se puede maquetar como se necesita | Verificado con Playwright: el título mide su posición dentro del padding de la tarjeta (antes: pegado al borde, fuera; ahora: con el mismo padding que el resto del contenido); confirmado visualmente en las 6 preguntas |

**Resultado del validador del W3C (ejecutado, no supuesto):** se envió cada
página al validador Nu del W3C (`validator.w3.org/nu`, versión 26.8.31), que
es el mismo motor que responde en la interfaz web:

| Página | Errores | Advertencias |
|---|---|---|
| `index.html` | 0 | 0 |
| `explorador-cursos.html` | 0 | 0 |
| `clase-muestra.html` | 0 | 0 |
| `asesor-virtual.html` | 0 | 0 |

Se comprobó además que la validación estaba realmente evaluando el contenido:
enviando a propósito un HTML roto (un `<div>` sin cerrar y un `<img>` sin
`alt`), el mismo servicio devolvió 4 errores y 1 advertencia. El "cero
errores" de arriba es un resultado real, no una respuesta vacía.

**Lo que sigue pendiente:** la captura de pantalla del validador para
adjuntar al entregable. El equipo debe subir cada archivo en
https://validator.w3.org/#validate_by_upload y capturar el mensaje
*Document checking completed. No errors or warnings to show.*

## 8. Actividad 7 — Auditar accesibilidad

| Hallazgo | Impacto | Corrección | Verificación |
|---|---|---|---|
| El menú hamburguesa (casilla `:checked`) no expone `aria-expanded` al abrirse/cerrarse | Un lector de pantalla no anuncia si el menú está abierto o cerrado, solo que hay una casilla | Ninguna posible sin JavaScript, que esta etapa prohíbe; queda anotada como limitación conocida (sección 5, ajuste 3) para resolver cuando la guía introduzca JS | Pendiente — se revisita en la etapa con JavaScript |
| El `<video>` de `clase-muestra.html` no tiene subtítulos ni transcripción | Un usuario sordo o con hipoacusia no puede seguir el audio de la lección | Ninguna todavía: el video es un clip de muestra (CC0, sin diálogo real que subtitular); cuando se suba una clase real hace falta un archivo `.vtt` con `<track kind="subtitles">`, que no necesita JavaScript tampoco | **Confirmado por axe-core:** aparece como `video-caption` en la lista de "revisar manualmente" de `clase-muestra.html` |

**Resultado de la auditoría (ejecutada, no supuesta):** se corrió
**axe-core v4.13.0** —el mismo motor que usa por dentro la extensión axe
DevTools— sobre las cuatro páginas, en Chromium a 1280 px de ancho:

| Página | Violaciones | Reglas aprobadas | A revisar manualmente |
|---|---|---|---|
| `index.html` | 0 | 34 | 0 |
| `explorador-cursos.html` | 0 | 38 | 0 |
| `clase-muestra.html` | 0 | 33 | 1 — `video-caption` |
| `asesor-virtual.html` | 0 | 41 | 0 |

Cero violaciones en las cuatro páginas. El único punto marcado para revisión
manual es justamente el que el equipo ya había anticipado y documentado por
su cuenta: los subtítulos del video.

**Lo que sigue pendiente:** las capturas de la extensión axe DevTools para el
entregable (*Scan all of my page* y la vista *Structure / Landmarks*). La
vista de landmarks es la que demuestra visualmente la decisión técnica 3 —un
`banner`, un `navigation`, un `main` y un `contentinfo`, sin duplicados— y esa
comprobación visual no la reemplaza correr el motor en consola.

## 9. Actividad 8 — Decisión original vs. implementación

| Decisión original | ¿Se implementó? | Evidencia | ¿Fue necesario modificarla? ¿Por qué? |
|---|---|---|---|
| `<section>` agrupa tres `<article>` autónomos | Sí | `index.html`, bloque `<section id="experiencias">` | No |
| Un único `<main>` y un único `<h1>` | Sí | `index.html`, `<h1 class="bienvenida__titulo">` dentro de `<main id="contenido">` | No |
| `<nav>` anidado dentro de `<header>` | Sí | `index.html`, `<nav aria-label="Navegación principal">` dentro de `<header class="encabezado">` | Sí, se le agregó el interruptor de menú hamburguesa por dentro (sigue siendo el mismo `<nav>`, mismo anidamiento) — necesario para cumplir "responsive en todos los dispositivos" sin romper "sin JavaScript" |
| Navegación siempre visible en fila | Parcial | `css/estilos.css`, reglas `.navegacion__lista` y el menú hamburguesa de la sección 3 de `SISTEMA-DE-DISENO.md` | Sí: por debajo de 40em la lista se colapsa detrás de un botón; no estaba en la especificación original, se añadió en este laboratorio (ajuste 3) |
| Botón de tarjeta (`<button type="button">`) para una interacción que se queda en la misma página | No, se reemplazó | `index.html`, los tres `<a class="boton boton--secundario" href="...">`; páginas reales en `explorador-cursos.html`, `clase-muestra.html`, `asesor-virtual.html` | Sí: el equipo pidió que el clic navegue de verdad ("le hago clic al botón y debe llevar a donde corresponde"). Como ahora navega, el elemento correcto pasó a ser `<a>`, siguiendo la propia regla del sistema de diseño (ajuste 5) |

## 10. Lista de verificación del laboratorio

| Criterio | Sí | Parcial | No |
|---|---|---|---|
| La implementación corresponde a la especificación grupal. | | ☑ (menú hamburguesa y navegación real de las tarjetas son adiciones registradas, ajustes 3 y 5) | |
| HTML5 semántico correctamente estructurado. | ☑ | | |
| Tres o más experiencias implementadas. | ☑ (funcionales de verdad: temario con `<details>`, video con `<video controls>`, recomendación con `:has()` — sin JavaScript) | | |
| CSS externo correctamente vinculado. | ☑ | | |
| Estilos básicos aplicados. | ☑ | | |
| Criterios iniciales de accesibilidad aplicados. | | ☑ (limitaciones conocidas: hamburguesa sin `aria-expanded`, video sin subtítulos) | |
| HTML validado y corregido. | ☑ (validador Nu del W3C: 0 errores y 0 advertencias en las 4 páginas; falta la captura) | | |
| Auditoría de accesibilidad realizada. | ☑ (axe-core v4.13.0: 0 violaciones en las 4 páginas; falta la captura de la extensión) | | |
| Las decisiones técnicas pueden demostrarse con evidencia. | ☑ | | |

## 11. Reflexión final (borrador para revisar en equipo)

**¿Qué decisión del trabajo grupal pude implementar con mayor facilidad?**
El único `<main>`/`<h1>` y el `<nav>` anidado en `<header>`: ya estaban
resueltos desde la especificación, solo hubo que trasladarlos a HTML sin
ambigüedad.

**¿Qué decisión tuve que modificar durante el laboratorio y por qué?**
Dos: la navegación pasó de "siempre en fila" a "colapsable en móvil" porque
la especificación original no contemplaba pantallas angostas; y los tres
botones de tarjeta pasaron de `<button type="button">` (marcador sin
efecto) a `<a href="...">` que navega de verdad a una página propia, porque
el equipo pidió que el clic llevara a algún lado y eso cambia cuál es el
elemento HTML correcto.

**¿Qué problema detecté mediante una herramienta de validación?**
Varios, cada uno con su propia herramienta: la petición fallida del logo
(pestaña de red), un `Unexpected token '--'` al cargar las ilustraciones
SVG (también red/consola), y un selector CSS que dejó de funcionar
(`:checked ~`) al reestructurar el HTML del test — visible comparando la
captura esperada contra la real, no por un mensaje de error.

**¿Qué aprendí al convertir una especificación en código?**
Que una especificación "congelada" (sin JavaScript, sin componentes nuevos)
igual necesita ajustes menores al implementarla — la clave no es no tocarla
nunca, sino registrar cada cambio con su motivo, como pide el flujo de
trabajo de la guía (sección 2).
