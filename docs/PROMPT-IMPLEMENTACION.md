# Prompt de implementación — Wayra Academy

> Copia todo lo que está debajo de la línea y pégalo en Claude, ChatGPT, Copilot o Cursor.
> Es autocontenido: no hace falta adjuntar el PDF de la guía.

---

Actúa como desarrollador front-end. Vas a implementar la página de inicio de **Wayra Academy** a partir de una especificación ya cerrada por un equipo de estudiantes. La especificación no se discute ni se mejora: se implementa tal cual, porque el equipo debe defender cada decisión frente a un docente.

## Contexto

Wayra Academy es una plataforma peruana de cursos y talleres en línea dictados por instructores verificados. Esta es la primera versión de la página inicial, correspondiente a la Semana 1 del curso de Desarrollo Web Full Stack Frontend. La etapa de análisis ya terminó; esta es la etapa de implementación y comprobación.

## Restricciones técnicas

- HTML5 y CSS3 escritos a mano. Sin frameworks, sin Bootstrap, sin Tailwind, sin preprocesadores.
- Sin JavaScript. Los botones son marcadores de interacciones futuras.
- Un solo archivo HTML y un solo archivo CSS externo.
- Mobile first, con dos puntos de quiebre: 40em y 62em.
- `lang="es-PE"`, codificación UTF-8, meta viewport.
- Comentarios en español que marquen cada región de la página.

## Estructura semántica obligatoria

Esta jerarquía es una decisión ya tomada y evaluada. Respétala exactamente:

```
header                     encabezado e identidad
  nav                      anidado DENTRO del header, no como hermano
main                       único en la página
  h1                       único en la página
  section                  agrupa las tres experiencias
    article ×3             cada una autónoma, con su propio h2
footer                     pie de página
```

Reglas derivadas que no se pueden romper:

1. `<nav>` va anidado dentro de `<header>`, nunca como hermano. El encabezado es el landmark introductorio que agrupa identidad y navegación.
2. Existe un único `<main>` y un único `<h1>`, y el `<h1>` vive dentro del `<main>`.
3. Cada `<article>` lleva un `<h2>`. La `<section>` también lleva un `<h2>` con su título visible. Ambos quedan en el mismo nivel: es válido y no genera saltos de jerarquía. No uses `<h3>`.
4. Cada `<article>` lleva `aria-labelledby` apuntando al `id` de su propio `<h2>`.
5. El `<nav>` lleva `aria-label="Navegación principal"`.
6. La `<section>` lleva `aria-labelledby` apuntando a su `<h2>`.

## Contenido exacto

### Encabezado

- Logotipo (SVG, decorativo, con `alt=""` porque el nombre ya está como texto al lado).
- Nombre: **Wayra Academy**
- Eslogan: **Tu centro de aprendizaje**
- Menú de navegación: Inicio · Cursos · Talleres en vivo · Nosotros · Ingresar o registrarse

### Contenido principal

- `h1`: **Aprende con instructores peruanos verificados**
- Párrafo: cursos y talleres en vivo dictados por profesionales que trabajan hoy en lo que enseñan; cada instructor pasa por una revisión de experiencia y de sus materiales antes de publicar.
- Acción principal: **Ver cursos disponibles**, como `<a>` que ancla a la sección de experiencias.

### Sección de experiencias

Título: **Experiencias interactivas**. Bajada: tres formas de conocer la plataforma antes de inscribirte.

| # | `h2` | Descripción | Imagen | Acción |
|---|---|---|---|---|
| 1 | Explorador interactivo de cursos | Filtra por categoría, nivel y duración, compara cursos lado a lado y revisa una vista previa del temario antes de decidir. | `img/explorador-cursos.webp` | Explorar cursos |
| 2 | Clases muestra en video | Una lección real y completa de un curso del catálogo. Se reproduce en el navegador, sin registro y sin tarjeta, para que compruebes cómo se enseña. | `img/clase-muestra.webp` | Ver clase gratis |
| 3 | Asesor virtual de ruta de aprendizaje | Seis preguntas sobre tus intereses, tu tiempo disponible y tu objetivo. Al terminar recibes el curso o la ruta de capacitación que te conviene seguir. | `img/asesor-virtual.webp` | Hacer el test |

Los tres botones de tarjeta son `<button type="button">`, no enlaces vacíos: representan interacciones dentro de la misma página. El botón principal sí es `<a>` porque navega. Esta diferencia debe poder justificarse.

Textos alternativos, que describen la **función** y no el aspecto:

1. Buscador de cursos con los filtros de categoría, nivel y duración activos, mostrando cinco cursos comparables con su temario.
2. Miniatura de una clase muestra en video, con el control de reproducción y la duración de la lección visibles.
3. Pantalla del test de asesor virtual con una pregunta sobre intereses y cuatro opciones de respuesta.

Las imágenes son `.webp` de 800 × 500 px, proporción 16:10, recortadas con `object-fit: cover`. Mientras no existan, el contenedor debe verse como un bloque gris con la proporción correcta, sin romper la maquetación.

### Pie de página

Cuatro bloques, cada uno con su propio `h2`: Contacto (usando `<address>` con `font-style: normal`), Redes sociales, Métodos de pago (Visa y Mastercard, Yape y Plin, PagoEfectivo, transferencia bancaria) y Certificaciones. Debajo, una línea de copyright: © 2026 Wayra Academy. Todos los derechos reservados.

## Sistema de diseño

Regla estricta: **ningún valor literal fuera del bloque `:root`**. Ni un hex, ni un rem, ni un px. Si hace falta un valor nuevo, primero se declara como token.

Nomenclatura de clases: BEM en español, `bloque__elemento--modificador`. Los modificadores nombran jerarquía, nunca ubicación: `--primario` y `--secundario`, jamás `--tarjeta` ni `--header`.

### Color

| Token | Valor | Uso |
|---|---|---|
| `--color-tinta` | `#1B2A4A` | Encabezado, pie, texto principal |
| `--color-tinta-clara` | `#35456A` | Separador dentro del pie |
| `--color-papel` | `#F4F6F8` | Fondo de la página |
| `--color-superficie` | `#FFFFFF` | Tarjetas |
| `--color-marco` | `#D9DFE6` | Bordes sobre fondo claro |
| `--color-vacio` | `#E4E9EF` | Imagen aún no cargada |
| `--color-texto-suave` | `#47566F` | Texto secundario sobre claro |
| `--color-texto-claro` | `#FFFFFF` | Texto sobre oscuro |
| `--color-texto-tenue` | `#C7D2E0` | Texto secundario sobre oscuro |
| `--color-accion` | `#C0006B` | Botones y anillo de foco |
| `--color-accion-firme` | `#9C0057` | Hover y active |
| `--color-destaque` | `#F2B705` | Solo bloques sólidos y subrayados |

`--color-destaque` **nunca** se usa como color de texto sobre fondo claro: da 1.7:1. Solo como bloque, como subrayado, o como texto sobre `--color-tinta`, donde alcanza 7.82:1.

### Tipografía

Dos familias de Google Fonts, con `preconnect` y fallback de sistema:

- `--fuente-titulo`: Bricolage Grotesque, pesos 600 y 800. Encabezados y nombre de marca.
- `--fuente-texto`: Source Sans 3, peso 400 y 600. Todo lo demás, incluidos los botones.

Escala: `--texto-100` 0.9375rem, `--texto-200` 1rem, `--texto-300` 1.0625rem (base), `--texto-400` 1.125rem, `--texto-500` 1.25rem, `--texto-600` 1.5rem, `--texto-700` 1.75rem, `--texto-800` `clamp(2.25rem, 7vw, 3.5rem)`.

Pesos: `--peso-normal` 400, `--peso-medio` 600, `--peso-fuerte` 800. Interlínea 1.15 en títulos, 1.65 en texto. `--ancho-lectura` 34rem para mantener la línea bajo 80 caracteres. `--ancho-pagina` 68rem.

### Espaciado

Escala de base 0.25rem, `--espacio-1` a `--espacio-9`: 0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 2.5 · 3 · 4.5 rem. Todo margen, relleno y `gap` sale de esta escala.

### Bordes, foco y movimiento

`--borde-fino` 1px, `--borde-marcado` 2px. `--radio-chico` 2px, `--radio-medio` 4px, `--radio-grande` 6px. `--foco-grosor` 3px, `--foco-color` igual a `--color-accion`, `--foco-margen` 3px. `--transicion` 150ms ease-out.

### Componente botón

Dos variantes. `--primario`: relleno fucsia con texto blanco, una sola por pantalla. `--secundario`: fondo blanco con borde y texto fucsia, ancho completo dentro de la tarjeta, se invierte en hover. Estados a implementar: reposo, hover, active, `:focus-visible` y `:disabled` con fondo gris y `cursor: not-allowed`.

### Componente tarjeta

`article.tarjeta` con un contenedor de imagen 16:10 arriba y un cuerpo debajo. El párrafo lleva `flex-grow: 1` para que los tres botones queden alineados aunque los textos midan distinto.

## Accesibilidad

Tres criterios comprometidos, que deben poder demostrarse:

1. **Contraste mínimo 4.5:1 en texto normal.** Toda combinación de la paleta debe superarlo. El valor más bajo esperado es 5.61:1.
2. **Texto alternativo en todas las imágenes**, describiendo la función de cada experiencia y no su apariencia. El logotipo va con `alt=""` por ser decorativo.
3. **Navegación completa por teclado con foco visible.** Anillo idéntico en todo elemento interactivo mediante `:focus-visible`, más un enlace "Saltar al contenido principal" que aparece al primer `Tab` y permite omitir el menú.

Agrega también `@media (prefers-reduced-motion: reduce)` neutralizando transiciones y animaciones.

Orden de foco esperado: saltar al contenido → 5 enlaces del menú → Ver cursos disponibles → Explorar cursos → Ver clase gratis → Hacer el test → enlaces del pie.

## Entregables

```
wayra-academy/
├── index.html
├── explorador-cursos.html
├── clase-muestra.html
├── asesor-virtual.html
├── css/estilos.css
├── img/logo-wayra.svg
├── img/  (ilustraciones de las tres experiencias; ver nota abajo)
├── media/clase-muestra.mp4
└── docs/
    ├── PROMPT-IMPLEMENTACION.md
    ├── SISTEMA-DE-DISENO.md
    ├── EVIDENCIA-VALIDACION.md
    └── GUIA-LABORATORIO-1.md
```

> Actualizado durante el Laboratorio 1, Etapa 2: los tres documentos se
> movieron a `docs/` junto con la guía de esa etapa, y cada experiencia sumó
> su propia página (`explorador-cursos.html`, `clase-muestra.html`,
> `asesor-virtual.html`) para que el clic navegue de verdad — ver el ajuste
> 5 en `EVIDENCIA-VALIDACION.md`. El árbol y el contenido
> de esta especificación se conservan igual por lo demás — es la entrada
> congelada que dice cómo se decidió el prototipo; los cambios hechos durante
> la implementación están registrados en `docs/EVIDENCIA-VALIDACION.md`.

`SISTEMA-DE-DISENO.md` documenta los tokens y los dos componentes con sus variantes, estados y notas de accesibilidad.

`EVIDENCIA-VALIDACION.md` documenta cómo se comprueba cada decisión: pasos para correr el validador del W3C y axe DevTools, la tabla de contrastes medidos con su ratio real, los textos alternativos redactados y el argumento de defensa de cada decisión técnica en una línea.

## Criterios de aceptación

Verifica y reporta cada punto antes de terminar:

- Un solo `<main>`, un solo `<h1>`, y el `<h1>` dentro del `<main>`.
- Cero elementos `<nav>` fuera de `<header>`.
- Tres `<article>` dentro de la `<section>`, cada uno con `h2` e `id` referenciado por `aria-labelledby`.
- Ningún `<h3>` en la página.
- Cero valores hex, rem o px fuera del bloque `:root` del CSS.
- Toda imagen con atributo `alt`.
- Validador del W3C sin errores ni advertencias.
- axe DevTools sin incidencias, y en la vista de landmarks: un `banner`, un `navigation`, un `main` y un `contentinfo`, sin duplicados.

## Qué no hacer

- No agregar secciones, componentes ni contenido que no esté en esta especificación.
- No cambiar la jerarquía de encabezados ni sacar el `<nav>` del `<header>`.
- No usar `<div>` con `onclick`, ni `<a href="#">` vacíos, ni `role` innecesarios sobre elementos que ya son semánticos.
- No usar sombras, degradados ni animaciones de entrada.
- No sustituir los textos por Lorem ipsum.
