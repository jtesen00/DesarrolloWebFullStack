# Wayra Academy — Sistema de diseño

Documentación de los tokens y componentes del prototipo.
Secciones 1 a 6: Semana 1. Sección 7: Semana 2 (layout). Sección 8: Semana 3 (interacción).
Regla del equipo: **ningún valor literal fuera del bloque `:root` de `css/estilos.css`.**
Si un valor nuevo hace falta, primero se agrega como token y después se usa.

---

## 1. Tokens

### Color

| Token | Valor | Uso |
|---|---|---|
| `--color-tinta` | `#1B2A4A` | Fondo del encabezado y del pie, texto principal |
| `--color-tinta-clara` | `#35456A` | Separador dentro del pie de página |
| `--color-papel` | `#F4F6F8` | Fondo de la página |
| `--color-superficie` | `#FFFFFF` | Fondo de las tarjetas |
| `--color-marco` | `#D9DFE6` | Bordes sobre fondo claro |
| `--color-vacio` | `#E4E9EF` | Espacio de la imagen mientras no carga |
| `--color-texto` | `var(--color-tinta)` | Alias semántico: color de texto por defecto del `body` |
| `--color-texto-suave` | `#47566F` | Texto secundario sobre fondo claro |
| `--color-texto-claro` | `#FFFFFF` | Texto sobre superficie oscura |
| `--color-texto-tenue` | `#C7D2E0` | Texto secundario sobre superficie oscura |
| `--color-accion` | `#C0006B` | Botones, anillo de foco |
| `--color-accion-firme` | `#9C0057` | Estados hover y active |
| `--color-destaque` | `#F2B705` | Bloques sólidos y subrayados |

**Restricción de uso:** `--color-destaque` nunca se aplica como color de texto sobre fondo claro. Su contraste contra `--color-papel` es de 1.7:1, por debajo del mínimo. Solo se usa como bloque de color, como subrayado, o como texto sobre `--color-tinta`, donde alcanza 7.82:1.

### Tipografía

Dos familias, roles claramente separados: `--fuente-titulo` (Bricolage Grotesque) para encabezados y el nombre de la marca; `--fuente-texto` (Source Sans 3) para todo lo demás, incluidos los botones.

| Token | Tamaño | Dónde aparece |
|---|---|---|
| `--texto-100` | 15 px | Eslogan, pie de página |
| `--texto-200` | 16 px | Texto de tarjeta, botones, títulos del pie |
| `--texto-300` | 17 px | Tamaño base del documento |
| `--texto-400` | 18 px | Párrafo de bienvenida |
| `--texto-500` | 20 px | Título de cada experiencia |
| `--texto-600` | 24 px | Nombre de la marca |
| `--texto-700` | 28 px | Título de la sección |
| `--texto-800` | 36–56 px fluido | Título de la página |

Pesos: `--peso-normal` 400, `--peso-medio` 600, `--peso-fuerte` 800. Interlínea 1.15 en títulos y 1.65 en texto corrido. La longitud de línea se limita con `--ancho-lectura` (34 rem), que mantiene el párrafo por debajo de 80 caracteres.

### Espaciado

Escala de base 0.25 rem. Todo margen, relleno y separación sale de aquí.

| Token | Valor |
|---|---|
| `--espacio-1` … `--espacio-9` | 0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 2.5 · 3 · 4.5 rem |

La escala se define completa aunque el prototipo todavía no use todos los pasos: `--espacio-4` y `--peso-normal` están disponibles para las siguientes pantallas. Un paso de escala sin uso no es un token sobrante; un valor inventado fuera de la escala sí es un error.

### Bordes, foco y movimiento

| Token | Valor | Uso |
|---|---|---|
| `--borde-fino` | 1 px | Marco de tarjeta y separadores |
| `--borde-marcado` | 2 px | Contorno de botón, subrayado de navegación |
| `--radio-chico` / `--radio-medio` / `--radio-grande` | 2 / 4 / 6 px | Foco, botones, tarjetas |
| `--foco-grosor` / `--foco-color` / `--foco-margen` | 3 px / `--color-accion` / 3 px | Anillo de foco, idéntico en toda la página |
| `--transicion` | 150 ms ease-out | Cambios de color en hover |

---

## 2. Componente: botón

Acción de la interfaz. Se usa como `<a>` cuando lleva a otro lugar (de la página o del sitio) y como `<button type="button">` cuando dispara una interacción que se queda en el mismo lugar. Desde que las tres experiencias tienen una página propia (ver sección 6), los tres botones de tarjeta son `<a>`: navegan de verdad, así que el elemento que les corresponde es el enlace, no el botón. Hoy no queda ningún `<button>` en el sitio — el componente sigue definido para el día en que una acción sí dispare algo en el mismo lugar (por ejemplo, un futuro filtro con JavaScript).

### Variantes

| Variante | Cuándo usarla | Ejemplo |
|---|---|---|
| `.boton--primario` | Acción principal de la página. Una sola por pantalla. | Ver cursos disponibles |
| `.boton--secundario` | Acción dentro de una tarjeta, navegue o no. Ocupa el ancho del contenedor. | Explorar cursos → `explorador-cursos.html` |

### Estados

| Estado | Aspecto | Comportamiento |
|---|---|---|
| Reposo | Primario: relleno fucsia, texto blanco. Secundario: fondo blanco, borde y texto fucsia. | — |
| Hover | Primario: fucsia más oscuro. Secundario: se invierte a relleno fucsia. | Transición de 150 ms |
| Active | Igual que hover | Sin desplazamiento ni sombra |
| Focus | Anillo de 3 px fucsia con 3 px de separación | Solo con `:focus-visible`, no aparece al hacer clic con el mouse |
| Disabled | Fondo y borde gris `--color-marco`, cursor bloqueado | No recibe foco |

### Accesibilidad

- **Rol:** `link` en los cuatro botones actuales: el principal salta a `#experiencias`, los tres de tarjeta navegan a su página de experiencia. El día que una acción dispare algo en el mismo lugar (sin cambiar de página ni de URL), le corresponde ser `<button type="button">`, no antes.
- **Teclado:** alcanzable con `Tab`, se activa con `Enter`. Si en el futuro vuelve a haber un `<button>` en el sitio, también se activará con la barra espaciadora — esa es la diferencia real entre los dos elementos, y la razón de elegir uno u otro según si navega o no.
- **Lector de pantalla:** el texto visible es el nombre accesible. No hace falta `aria-label`.

| Sí | No |
|---|---|
| Texto que nombra la acción: "Ver clase gratis" | Texto genérico: "Clic aquí", "Más" |
| `<a href="...">` para lo que navega a otra página, `<button>` para lo que no cambia de URL | `<div onclick>` o `<a href="#">` vacío |
| Un solo botón primario por pantalla | Dos primarios compitiendo |

### Código

```html
<a class="boton boton--primario" href="#experiencias">Ver cursos disponibles</a>
<a class="boton boton--secundario" href="explorador-cursos.html">Explorar cursos</a>
```

---

## 3. Componente: navegación (menú hamburguesa)

Agregado en el Laboratorio 1, Etapa 2, para cumplir "responsive en
tablet/celular/desktop/laptop" sin usar JavaScript (restricción vigente de
esta etapa). Usa una casilla oculta (`<input type="checkbox">`) en vez de
un botón con JS: el estado abierto/cerrado lo controla el propio navegador
mediante el selector `:checked`.

### Anatomía

```
nav.navegacion
├── input.navegacion__interruptor   casilla real, transparente, superpuesta al botón
├── label.navegacion__boton         ícono de tres líneas, decorativo
│   └── span.navegacion__linea ×3
└── ul.navegacion__lista            mismo listado de siempre
```

### Estados y breakpoints

| Ancho | Aspecto |
|---|---|
| < 40 em (celular) | `.navegacion__lista` oculta (`display: none`); el botón de tres líneas es el único elemento visible del `<nav>` |
| Casilla marcada, < 40 em | `.navegacion__lista` se muestra en columna debajo del botón |
| ≥ 40 em (tablet, laptop, desktop) | El botón y la casilla se ocultan (`display: none`); `.navegacion__lista` vuelve a mostrarse siempre, en fila — ningún breakpoint nuevo, reusa los dos ya existentes (`40em`, `62em`) |

Ningún token nuevo hizo falta: el botón usa `--espacio-8` (3 rem) como
tamaño de caja táctil, `--espacio-5` como ancho de cada línea,
`--borde-marcado` como su grosor y `--espacio-1` como separación entre
líneas — todos ya declarados en `:root` para otros componentes.

### Accesibilidad

- **Nombre accesible:** `aria-label="Abrir menú de navegación"` en la
  casilla, porque el `<label>` visible es puramente decorativo (tres
  líneas, sin texto).
- **Teclado:** la casilla es un `<input>` nativo, alcanzable con `Tab` y
  activable con la barra espaciadora; no necesita JavaScript para nada de
  esto. El foco visible se dibuja sobre el botón (`+ .navegacion__boton`)
  cuando la casilla recibe `:focus-visible`, con el mismo anillo que el
  resto de la página.
- **Limitación conocida:** este patrón no puede exponer `aria-expanded`
  (eso requeriría JavaScript para sincronizar el atributo con el estado).
  Se revisa cuando la guía introduzca JavaScript en una etapa posterior;
  por ahora el estado abierto/cerrado solo se comunica visualmente y por
  `:checked`, no por ARIA.

---

## 4. Componente: tarjeta de experiencia

Contenedor de una experiencia interactiva. En el HTML es un `<article>` porque cada una es autónoma y podría reutilizarse en otra página.

### Anatomía

```
article.tarjeta
├── div.tarjeta__medio      imagen 16:10, recortada con object-fit
└── div.tarjeta__cuerpo
    ├── h2.tarjeta__titulo  nombre de la experiencia
    ├── p.tarjeta__texto    qué hace y qué obtiene el usuario
    └── a.boton             navega a la página real de la experiencia
```

El cuerpo usa `flex-grow` en el párrafo, de modo que los tres botones quedan alineados aunque los textos tengan distinto largo.

### Accesibilidad

- Cada `<article>` lleva `aria-labelledby` apuntando al `id` de su propio `h2`, para que un lector de pantalla anuncie "artículo, Explorador interactivo de cursos" en vez de solo "artículo".
- La imagen lleva un `alt` que describe la **función** de la experiencia, no su aspecto.
- Las tres imágenes son ilustraciones planas en `.svg` (no capturas reales) mientras las experiencias no tengan funcionalidad propia — ver el ajuste registrado en `EVIDENCIA-VALIDACION.md`. El `<img>` sigue siendo un `<img>` con `alt` real, así que la accesibilidad no cambia.

---

## 5. Las tres experiencias como páginas reales

Cada tarjeta ahora navega a una página propia (`explorador-cursos.html`,
`clase-muestra.html`, `asesor-virtual.html`), todas construidas con los
mismos tokens y sin una línea de JavaScript. Reutilizan `.pagina`,
`.pagina__volver`, `.pagina__cabecera`, `.pagina__titulo` y `.pagina__intro`
como esqueleto común (título de la página + enlace de vuelta), y cada una
suma su propio componente:

### Explorador de cursos: `.curso`

```
div.filtros                     3 <select> de categoría/nivel/duración — visuales, no filtran todavía
div.cursos__grilla
└── article.curso ×5
    ├── h2.curso__titulo
    ├── div.curso__etiquetas    categoría, nivel, duración como texto plano
    ├── p.curso__texto
    └── details.curso__detalle  "Ver temario" — nativo, sin JavaScript
        └── summary + ul.curso__temario
```

`<details>/<summary>` es HTML5 nativo: se abre con clic o con `Enter` sobre
`<summary>` enfocado, sin ningún `addEventListener`. Es la única parte de
esta experiencia que es real hoy; el filtrado por categoría/nivel/duración
queda anotado como pendiente de la etapa con JavaScript (los `<select>`
están ahí, correctamente etiquetados con `<label>`, pero no reordenan nada
todavía).

### Clase muestra: `.video-marco`

Un `<video controls>` real, con `poster` apuntando a la ilustración SVG de
la tarjeta. No necesita JavaScript: los controles nativos (play, pausa,
volumen, pantalla completa) los da el navegador. El archivo
(`media/clase-muestra.mp4`) es un clip de muestra con licencia CC0 (dominio
público) de la librería de ejemplos de MDN — no es contenido real del
catálogo, es exactamente el mismo tipo de sustitución honesta que ya se
hizo con las ilustraciones SVG.

### Asesor virtual: `.test`

Seis preguntas como `<div role="group" aria-labelledby="...">` con un `<h2>`
como título y radios nativos — no `<fieldset>/<legend>`, porque el
navegador posiciona `<legend>` montado sobre el borde superior de su
`<fieldset>` ignorando el `padding` (el título quedaba fuera de la
tarjeta), incluso con el `<fieldset>` en `display:flex`. `role="group"` +
`aria-labelledby` es el patrón que WAI-ARIA documenta como equivalente
accesible para agrupar radios cuando fieldset/legend no se puede maquetar
como se necesita, y se comporta como un `<div>` normal, sin casos
especiales de renderizado. Las primeras cinco son
solo para llenar (cruzarlas todas en una recomendación necesita guardar
estado, que es JavaScript). La sexta pregunta sí calcula una recomendación
real, sin JavaScript, con el selector `:has()`:

```css
.test__final:has(#obj-empleo:checked) #resultado-empleo { display: block; }
```

`:has()` compila si el radio marcado está en cualquier parte dentro del
`<fieldset>`, así que no depende de que el resultado sea "hermano directo"
del radio — a diferencia del truco de casilla del menú hamburguesa
(sección 3), que sí necesita esa relación de hermanos. Tiene buen soporte
en navegadores actuales (Chrome, Edge, Firefox y Safari desde 2023-2024) y
degrada con gracia si faltara: el resultado simplemente no aparece, sin
romper el resto de la página ni generar un error.

---

## 6. Resultado de la corrección

| Categoría | Antes | Ahora |
|---|---|---|
| Colores | 5 tokens, 5 hex sueltos en 8 lugares | 13 tokens, 0 hex fuera de `:root` |
| Espaciado | 1 token, 24 valores arbitrarios | Escala de 9 pasos, 0 valores sueltos |
| Tipografía | 2 familias, 9 tamaños arbitrarios | Escala de 8 pasos más pesos e interlíneas |
| Bordes y radios | 0 tokens, 3 radios improvisados | 5 tokens |
| Movimiento | Sin transiciones, con un `prefers-reduced-motion` que no protegía nada | Un token de transición, ya cubierto por la media query |
| Total | 10 tokens | 49 tokens, 220 usos de `var()` |

Ni el menú hamburguesa (sección 3) ni las tres páginas de experiencia
(sección 5) sumaron un solo token nuevo: los 49 tokens son los mismos desde
que se agregó `--color-texto` a la tabla de color. Todo lo nuevo —botón de
menú, filtros, tarjetas de curso, marco de video, preguntas del test— sale
de reusar `--espacio-*`, `--color-*`, `--radio-*`, `--borde-*` y los tokens
de foco y tipografía ya existentes. El salto de 131 a 220 usos de `var()`
es exactamente ese: mucho más CSS, cero valores literales nuevos.

**Cambio con impacto en el HTML:** los modificadores de botón se renombraron. `.boton--principal` pasó a `.boton--primario` y `.boton--tarjeta` a `.boton--secundario`, porque el nombre de una variante debe describir su jerarquía, no el lugar donde apareció por primera vez. Si mañana un botón secundario va fuera de una tarjeta, el nombre viejo habría mentido.

---

## 7. Disposición de página: `.disposicion` y `.lateral`

*Semana 2.* El único Grid bidimensional del proyecto. Envuelve `<main>` y
`<aside>`; el encabezado y el pie quedan fuera porque su fondo debe llegar al
borde de la ventana.

### Anatomía

```
div.disposicion                 Grid. 1 columna hasta 62em, 2 desde ahí.
├── main.principal | .pagina    area "principal"
└── aside.lateral               area "lateral"
    └── div.lateral__bloque     tarjeta de contenido complementario
        ├── h2.lateral__titulo  rótulo en versalita y color de acción
        ├── ul.lateral__lista   pares dato + apunte
        └── p.lateral__texto    párrafo suelto
```

Modificador: `.lateral__bloque--fijo` aplica `position: sticky` desde 62em.
Necesita que el `<aside>` se estire a todo el alto de la fila; por eso
`.disposicion` **no** lleva `align-items: start`.

### Tokens que usa

`--ancho-pagina`, `--ancho-lateral`, `--alto-minimo-contenido`,
`--espacio-5`, `--espacio-7`, `--espacio-8`, `--espacio-9`,
`--color-superficie`, `--color-marco`, `--color-accion`, `--radio-grande`.

### Accesibilidad

`<aside>` expone el landmark `complementary`, que el lector de pantalla lista
junto a `banner`, `navigation`, `main` y `contentinfo`. Va siempre después de
`<main>` en el HTML, así que el orden del DOM coincide con el visual en todos
los anchos: el Grid lo recoloca sin tocar el marcado.

---

## 8. Estados de la interacción

*Semana 3.* Clases que añade y quita `js/interaccion.js`; el CSS solo las
describe. Viven al final de la hoja, **después** de las definiciones de
componente: con la misma especificidad gana la última regla, y colocarlas antes
hacía que el borde base del componente pisara el del estado.

| Clase | Sobre qué | Qué cambia |
|---|---|---|
| `.filtros__campo--activo` | Un campo de filtro fuera de su valor por defecto | Rótulo en `--color-accion` y `--peso-fuerte`; borde del control en color de acción |
| `.resultados` | Recuento de cursos | Estilo base del mensaje; existe ya en el HTML con el número inicial |
| `.resultados--vacio` | El mismo, con 0 coincidencias | Texto `--color-aviso` sobre `--color-aviso-fondo`, con relleno y radio |
| `.test__grupo--falta` | Pregunta del test sin responder | Borde en color de aviso y franja izquierda de `--espacio-1` |
| `.test__aviso-validacion--error` | Mensaje bajo el botón | Texto en `--color-aviso` |
| `.test__ruta` | Ruta calculada, en el `<aside>` | Bloque sólido `--color-destaque` con texto `--color-tinta` |

### Regla de color

Ningún estado se comunica **solo** por color. El filtro activo cambia peso
tipográfico además de tono; la pregunta pendiente suma una franja gruesa al
borde; la lista vacía cambia de fondo y de texto. Es la misma regla que ya
seguía el foco visible desde la Semana 1.

`--color-destaque` se usa aquí como bloque sólido con texto oscuro encima, que
es su único uso autorizado (sección 1, tabla de color): nunca como color de
texto sobre fondo claro.

### Contraste medido

| Estado | Relación | Mínimo AA |
|---|---|---|
| `.resultados` | 6.85:1 | 4.5:1 |
| `.resultados--vacio` | 8.46:1 | 4.5:1 |
| `.test__aviso-validacion--error` | 8.94:1 | 4.5:1 |
| `.test__ruta` | 7.82:1 | 4.5:1 |

---

## 9. Tema oscuro, selector de tema y modal

*Semana 4.* Detalle completo en [`SEMANA-4-INTEGRACION.md`](SEMANA-4-INTEGRACION.md).

### Tema oscuro: `:root.tema-oscuro`

`js/tema.js` pone la clase sobre `<html>`. El bloque redefine **13 tokens** y
`color-scheme: dark`; ningún componente tiene reglas propias para el modo
oscuro. `--color-tinta` y `--color-texto-claro` no cambian: el encabezado y el
pie ya eran oscuros.

| Token | Claro | Oscuro | Contraste en oscuro |
|---|---|---|---|
| `--color-papel` | `#F4F6F8` | `#0F1728` | texto 15.07:1 |
| `--color-superficie` | `#FFFFFF` | `#182238` | texto 13.35:1 · suave 8.17:1 |
| `--color-texto` | tinta | `#E6ECF5` | — |
| `--color-texto-suave` | `#47566F` | `#AEBBD0` | sobre vacío 6.79:1 |
| `--color-accion` | `#C0006B` | `#FF85BF` | sobre superficie 7.06:1 |
| `--color-sobre-accion` | blanco | tinta | sobre acción 6.34:1 |
| `--color-aviso` | `#8A1200` | `#FFA08C` | sobre aviso-fondo 7.92:1 |

Además cambian `--color-marco`, `--color-vacio`, `--color-accion-firme`,
`--color-aviso-fondo`, `--color-velo` y `--sombra-modal`.

### Tokens nuevos

| Token | Valor | Para qué |
|---|---|---|
| `--color-sobre-accion` | `var(--color-texto-claro)` | Texto sobre un fondo de acción; pasa a tinta en oscuro |
| `--color-velo` | `rgb(27 42 74 / 0.72)` | `::backdrop` del modal |
| `--sombra-modal` | `0 1rem 3rem rgb(0 0 0 / 0.35)` | Sombra del modal |
| `--radio-pildora` | `999px` | Interruptor del tema |

### Componentes

| Clase | Qué es |
|---|---|
| `.tema`, `.tema__interruptor` | `<button aria-pressed>` del encabezado. El estado se ve por la posición de la perilla, no solo por su color |
| `.modal`, `.modal__caja`, `.modal__cerrar` | `<dialog>` abierto con `showModal()`. El relleno va en `.modal__caja` para detectar el clic en el velo |
| `.test__dato`, `.test__campo`, `.test__error` | Campo de texto del formulario del asesor y su mensaje de error |
| `.navegacion__acceso` | Pasa de `<a>` a `<button>`: abre el modal |

### Foco sobre fondo oscuro

`.encabezado` y `.pie` redefinen `--foco-color` como `--color-destaque`. El rosa
sobre tinta daba 2.34:1, por debajo del 3:1 de WCAG 1.4.11; el amarillo da 7.82:1.
