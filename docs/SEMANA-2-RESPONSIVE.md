# Wayra Academy — Semana 2: layout responsive

Registro de la etapa de adaptabilidad. Acompaña a la Guía de Trabajo Grupal N°2
(planificación) y a la Guía de Laboratorio N°2 (implementación).

Este documento se escribió **después** de la Semana 3, para cerrar el hueco:
la Semana 2 se implementó y se midió, pero no se había volcado a `docs/`.
Las cifras salen de leer el layout ya calculado por el navegador, no de estimarlo.

---

## 1. Qué cambió respecto de la Semana 1

| | Semana 1 | Semana 2 |
|---|---|---|
| Regiones del documento | `header`, `nav`, `main`, `footer` | + `aside` (landmark `complementary`) en las 4 páginas |
| Grid | Solo dentro de las grillas de tarjetas | + Grid de página con `grid-template-areas` |
| Media queries | 2 (`40em`, `62em`) más `prefers-reduced-motion` | Las mismas; cambia lo que hacen |
| Unidades de ventana | `vw` una vez, dentro de un `clamp()` | + `vh` en dos sitios |
| `css/estilos.css` | 706 líneas | 899 líneas |

---

## 2. El Grid de página: `.disposicion`

```css
.disposicion {
  max-width: var(--ancho-pagina);
  margin: 0 auto;
  padding: var(--espacio-8) var(--espacio-5) var(--espacio-9);
  min-height: var(--alto-minimo-contenido);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "principal"
    "lateral";
  gap: var(--espacio-8);
}

.principal,
.pagina   { grid-area: principal; min-width: 0; }
.lateral  { grid-area: lateral;   min-width: 0; }

@media (min-width: 62em) {
  .disposicion {
    grid-template-columns: 1fr minmax(16rem, var(--ancho-lateral));
    grid-template-areas: "principal lateral";
    gap: var(--espacio-7);
  }
}
```

### Por qué el contenedor no es `body`

El encabezado y el pie tienen fondo oscuro a sangre: debe llegar al borde de la
ventana. Como celdas de un Grid limitado a `68rem` se cortarían a los lados.
Los dos ya resolvían su centrado con `.encabezado__interior` y `.pie__interior`
desde la Semana 1, así que se quedan fuera y `.disposicion` envuelve solo
`<main>` y `<aside>`.

Consecuencia: el Grid declara **dos** áreas, no las cinco de la plantilla de la
guía. `<nav>` tampoco es un área porque está anidado dentro de `<header>`
—decisión deliberada de la Semana 1— y se resuelve con Flexbox.

### Por qué `min-width: 0`

El tamaño mínimo automático de un elemento de Grid es el de su contenido, no
cero. Sin esa línea, un hijo ancho estira su columna y provoca scroll horizontal.

### Por qué 62em y no los 768 px del ejemplo

A 768 px, restar `16rem` de columna lateral más el `gap` deja el contenido
principal en unos 460 px: las tarjetas volverían a una columna y el aside
competiría con el contenido. A 992 px quedan unos 700 px.

Los dos breakpoints van en `em` y no en píxeles: dentro de una media query,
`em` se resuelve contra la fuente base del navegador, así que si el usuario la
sube el cambio de layout se adelanta en vez de apretar el texto.

---

## 3. El `<aside>` de cada página

| Página | Contenido complementario |
|---|---|
| `index.html` | Próximas fechas de inicio y motivos para elegir Wayra |
| `explorador-cursos.html` | Cómo elegir curso, certificaciones y salidas a las otras experiencias |
| `clase-muestra.html` | Temario de la clase y otras clases muestra |
| `asesor-virtual.html` | La recomendación del test, fija con `position: sticky` |

Va **siempre después de `<main>` en el HTML**, en las cuatro páginas. Así el
orden del DOM coincide con el visual en todos los anchos: ni el lector de
pantalla ni la tabulación se desordenan cuando el Grid lo mueve a la derecha.

**Los filtros del explorador se quedan en `<main>`**, no en el aside. Gobiernan
el contenido principal, así que no son complementarios: el criterio semántico
resuelve el empate.

---

## 4. Problemas encontrados y corregidos

| Problema | Causa | Corrección |
|---|---|---|
| La barra lateral fija del asesor desaparecía al bajar | `align-items: start` encogía la caja del `<aside>` a la altura de su contenido, y `position: sticky` no tenía recorrido dentro de ella | Se quitó esa línea para volver al `stretch` por defecto y se añadió `.lateral { justify-content: start }` |
| El video salía deformado a 310×500 en móvil | `max-height: 70vh` sin `height: auto`: el atributo `height="500"` seguía mandando | Se añadió `height: auto` |
| Los 3 `<select>` de filtros no alineaban (180/160/174 px) | `flex-wrap` repartía por contenido | `flex-direction: column` en móvil y `flex: 1 1 0` desde 40em |
| El párrafo de `.leccion-info` medía 990 px | Faltaba `max-width` | `max-width: var(--ancho-lectura)` (34rem) |
| Los enlaces del pie medían 24 px de alto | Sin relleno vertical propio | Token `--toque-minimo: 2.75rem` con `inline-flex` + `min-height` |

---

## 5. Medición del resultado

| Qué se midió | Antes | Después | Ancho |
|---|---|---|---|
| Elementos `<aside>` | 0 | 4 | todas |
| Reparto del ancho útil | main 1040 px, 0 de lateral | main 680 + lateral 320 | 1440 px |
| Anchos de los 3 `<select>` | 180 / 160 / 174 px | iguales entre sí | 375 y 1440 px |
| Alto de los enlaces del pie | 24 px | 44 px | 375 px |
| Medida del párrafo de `.leccion-info` | 990 px | 544 px | 1440 px |
| Caja del video | 310×500 (deformado) | 310×194 | 375 px |
| Desborde horizontal | 0 | 0 | 320–1440 px |
| Solapamientos entre bloques | — | 0 en 12 combinaciones | 390/834/1440 |
| Contraste WCAG | — | 0 fallos en 23 combinaciones | — |

---

## 6. Lo que se conserva de la Semana 1

El HTML semántico, el bloque `:root` como única fuente de valores, el menú
hamburguesa sin JavaScript, el enlace de salto, el foco visible unificado y el
único `<h1>` por página. La adaptación no oculta contenido en móvil: se
reordena, no se recorta.

**Limitación que sigue abierta:** el botón del menú hamburguesa no expone
`aria-expanded`, porque sincronizar ese atributo con el estado de la casilla
requiere JavaScript. Anotada desde la Semana 1.

---

## 7. Enlaces

- Sistema de diseño y componentes: [`SISTEMA-DE-DISENO.md`](SISTEMA-DE-DISENO.md), secciones 7 y 8.
- Etapa siguiente: [`SEMANA-3-INTERACCION.md`](SEMANA-3-INTERACCION.md).
