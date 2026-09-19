# Wayra Academy — Semana 3: interacción con JavaScript

Registro de la etapa de comportamiento. Acompaña a la Guía de Trabajo Grupal N°3
(planificación) y a la Guía de Laboratorio N°3 (implementación).

Es la **primera capa de JavaScript del proyecto**. Hasta aquí, las tres
experiencias funcionaban solo con HTML y CSS.

---

## 1. Qué se implementó

Dos interacciones, un solo archivo: `js/interaccion.js` (240 líneas).

| | Interacción A | Interacción B |
|---|---|---|
| Página | `explorador-cursos.html` | `asesor-virtual.html` |
| Qué hace | Filtra el catálogo en vivo | Valida las 6 preguntas y calcula una ruta |
| Evento | `change` en 3 `<select>`, `input` en el buscador | `click` en un `<button>` |
| Función | `aplicarFiltros()` | `leerRespuestas()` + `escribirRuta()` |
| Bucle | Las 5 tarjetas de curso | Los 6 grupos de preguntas |
| Condición | Coincidencia múltiple y cero resultados | Campo obligatorio sin responder |

Las dos cierran un pendiente que el propio HTML declaraba: *«los filtros
todavía no reordenan la lista»* y *«cruzarlas todas requiere la etapa con
JavaScript»*. Esos dos párrafos se actualizaron.

---

## 2. Reglas que sigue esta capa

1. **`const` por defecto, `let` solo donde el valor cambia.** En todo el archivo
   hay una sola variable `let`: el contador `visibles` del bucle de filtrado.
2. **Mejora progresiva.** Si el archivo no se ejecuta, las dos páginas funcionan
   como en la Semana 2. Nada se oculta desde el HTML: el catálogo parte con las
   cinco tarjetas visibles y el recuento inicial escrito.
3. **Los datos no se leen del texto visible.** Cada tarjeta lleva
   `data-categoria`, `data-nivel` y `data-horas`. Leer «28 horas» de un `<span>`
   obligaría a recortar la palabra y se rompería al corregir una tilde.
4. **Nada de `innerHTML`.** El contenido se escribe con `textContent` y nodos
   creados con `createElement`.
5. **Un archivo para todo el sitio.** Cada bloque comprueba que sus elementos
   existan antes de engancharse, así que cargarlo en una página que no los tiene
   no produce errores.

---

## 3. Preparación del HTML

Cambios previos que la lógica necesitaba. Ninguno es JavaScript:

| Dónde | Cambio |
|---|---|
| `explorador-cursos.html` | `value` estable en las 13 `<option>` (`todas`, `desarrollo-web`, `corta`…) |
| | `data-categoria`, `data-nivel`, `data-horas` en las 5 tarjetas |
| | Campo `<input type="search" id="busqueda-curso">` con su `<label>` |
| | `<p id="aviso-resultados" role="status">` entre los filtros y la grilla |
| `asesor-virtual.html` | `value` en los 19 radios |
| | `<button type="button" id="ver-ruta">` y `<p id="aviso-ruta" role="status">` |
| | `<p id="ruta-completa" hidden>` dentro del `<aside>` |
| ambas | `<script src="js/interaccion.js" defer>` |

`defer` y no `DOMContentLoaded`: el script se descarga en paralelo y se ejecuta
cuando el DOM ya existe, así que las referencias nunca salen `null` sin
necesidad de envolver nada.

---

## 4. Decisiones que merecen explicación

### `change` e `input`, no `click`

`change` en un `<select>` se dispara igual con el ratón que con el teclado;
`click` dejaría fuera a quien navega con `Tab` y flechas. En el buscador,
`input` reacciona también al pegar o borrar con el ratón, cosa que `keyup` no
garantiza. Entre los dos eliminan la necesidad de un botón «Buscar».

### Campo vacío no es un error

Un buscador vacío significa «no filtres por texto». Sacar un aviso ahí sería
regañar al usuario por no haber escrito todavía. El aviso se reserva para
cuando la búsqueda **sí** se hizo y no encontró nada.

### `hidden`, no `style.display`

El atributo saca la tarjeta también del árbol de accesibilidad. Medido: con el
catálogo filtrado a cero, los elementos enfocables de la página bajan de 24 a
19, porque los cinco `<summary>` de «Ver temario» dejan de ser alcanzables con
`Tab`.

### La ruta completa reemplaza a la parcial

El asesor tiene dos recomendaciones: la que calcula el CSS con `:has()` a partir
de la pregunta 6 —el suelo sin JavaScript— y la que cruza las seis respuestas.
Mostrarlas a la vez las hacía **contradecirse**: a quien declara experiencia
previa, la parcial le proponía el curso inicial y la completa el avanzado.
Cuando la completa aparece, la parcial se oculta; si la validación falla, vuelve.

---

## 5. Pruebas ejecutadas

Filtrado del catálogo, en navegador:

| Caso | Acción | Resultado |
|---|---|---|
| Carga inicial | — | 5 visibles · «5 cursos coinciden» · 0 filtros resaltados |
| Caso normal | Categoría = Desarrollo web | 2 visibles · «2 cursos coinciden» · Categoría resaltada |
| Filtros se suman | + Nivel = Intermedio | 1 visible · «1 curso coincide» · 2 resaltados |
| Se deshacen | Ambos a su valor por defecto | 5 visibles · 0 resaltados |
| Cero resultados | Duración = Menos de 10 horas | 0 visibles · aviso · fondo de error |
| Búsqueda | «react» y «REACT» | 1 visible en ambos: ignora mayúsculas |
| Búsqueda sin resultado | «zzz» | 0 visibles · aviso |
| Campo vacío | Borrar el buscador | 5 visibles · **sin** aviso de error |

El caso de cero resultados es alcanzable con un solo filtro: los cinco cursos
duran 18, 20, 24, 28 y 36 horas, así que «Menos de 10 horas» vacía la lista.

Asesor virtual:

| Caso | Acción | Resultado |
|---|---|---|
| Enviar vacío | Pulsar sin responder | «Te faltan por responder las preguntas 1, 2, 3, 4, 5, 6.» · 6 grupos marcados |
| Parcial | Responder 1 y 2, pulsar | «…las preguntas 3, 4, 5, 6.» · 4 grupos marcados |
| Completo | Responder las 6 | Ruta escrita en el `<aside>` · 0 grupos marcados |
| Cruce de respuestas | Cambiar nivel a «experiencia» | La ruta pasa de Frontend a React desde cero |
| Cambiar área | Área = Datos e IA | La ruta pasa a Fundamentos de análisis de datos |

Regresión y accesibilidad:

- **Consola:** 0 mensajes en los 7 escenarios capturados. El único ruido posible
  es un 404 de `/favicon.ico` que pide el navegador solo; el proyecto nunca
  declaró favicon y es anterior a esta etapa.
- **Sin JavaScript:** con el motor desactivado, el explorador muestra las 5
  tarjetas y el recuento inicial. Nada queda oculto ni roto.
- **Layout de la Semana 2:** intacto en 390, 768 y 1440 px. 0 desbordes.
- **Contraste de los colores nuevos:** aviso normal 6.85:1, aviso de lista vacía
  8.46:1, aviso de validación 8.94:1, bloque de ruta 7.82:1. Todos por encima
  del 4.5:1 de WCAG AA.

---

## 6. Problema encontrado durante el laboratorio

`.test__grupo--falta` no se veía. La regla estaba escrita **antes** que
`.test__pregunta` en la hoja, y con la misma especificidad (0,1,0) gana la
última: el borde gris del componente pisaba el rojo del estado.

Se movió el bloque «Estados de la interacción» detrás de las definiciones de
componente, justo antes de las media queries. Verificado después:
`border-left: 4px rgb(138, 18, 0)`.

Es la razón por la que ese bloque vive donde vive, y no por gusto de orden.

---

## 7. Tokens nuevos

| Token | Valor | Para qué |
|---|---|---|
| `--color-aviso` | `#8A1200` | Texto de error sobre fondo claro |
| `--color-aviso-fondo` | `#FDECE8` | Fondo del aviso de lista vacía |
| `--base-opcion` | `14rem` | Ancho base de cada opción del test en fila |

El tercero no es de esta etapa: era un `14rem` literal que la Semana 2 había
dejado dentro de una media query, el único valor suelto fuera de `:root` que
había introducido el equipo. Se tokenizó al pasar por aquí.

Estado del sistema: **56 tokens, 273 usos de `var()`**.

---

## 8. Lo que sigue pendiente

- `aria-expanded` en el botón del menú hamburguesa. Ahora que hay JavaScript,
  ya es posible: es el primer candidato de la próxima etapa.
- El proyecto no declara favicon, así que el navegador pide `/favicon.ico` y
  recibe un 404. Es ruido, no un fallo, pero ensucia la consola.
- Los filtros no se reflejan en la URL, así que un resultado filtrado no se
  puede compartir con un enlace.
