# Documentación — Wayra Academy

Índice de la carpeta `docs/`. El proyecto avanza una etapa por semana sobre el
**mismo** producto: no se crea una página nueva en ninguna de ellas.

```
ESTRUCTURA  →  ADAPTABILIDAD  →  INTERACCIÓN  →  INTEGRACIÓN
 Semana 1        Semana 2          Semana 3        Semana 4
```

---

## Documentos

| Archivo | Qué contiene | Etapa |
|---|---|---|
| [`SISTEMA-DE-DISENO.md`](SISTEMA-DE-DISENO.md) | Tokens y componentes. **Fuente única de verdad** del CSS. Secciones 1-6 Semana 1, 7 Semana 2, 8 Semana 3 | todas |
| [`PROMPT-IMPLEMENTACION.md`](PROMPT-IMPLEMENTACION.md) | Especificación de partida: contenido exacto, restricciones y criterios de aceptación | Semana 1 |
| [`GUIA-LABORATORIO-1.md`](GUIA-LABORATORIO-1.md) | Guion del laboratorio de estructura semántica | Semana 1 |
| [`EVIDENCIA-VALIDACION.md`](EVIDENCIA-VALIDACION.md) | Validación del primer prototipo: HTML, accesibilidad, decisiones técnicas | Semana 1 |
| [`SEMANA-2-RESPONSIVE.md`](SEMANA-2-RESPONSIVE.md) | Grid de página, `<aside>`, breakpoints, unidades y mediciones del layout | Semana 2 |
| [`SEMANA-3-INTERACCION.md`](SEMANA-3-INTERACCION.md) | Primera capa de JavaScript: filtrado del catálogo y validación del asesor | Semana 3 |
| [`SEMANA-4-INTEGRACION.md`](SEMANA-4-INTEGRACION.md) | Evaluación grupal: teoría, matriz RF1–RF5, tema oscuro, formulario validado, modal animado, 21 pruebas y guion del video. Versión Word: `SEMANA-4-INTEGRACION.docx` | Semana 4 |
| [`evidencias-semana-4/`](evidencias-semana-4/) | 14 capturas y `resultados.json` de las pruebas automatizadas | Semana 4 |

---

## Estado del proyecto

| Semana | Producto | Estado |
|---|---|---|
| 1 | Prototipo semántico y accesible. 4 páginas HTML5, sistema de diseño en `:root` | Cerrada |
| 2 | Layout responsive con CSS Grid, Flexbox, media queries y unidades relativas | Cerrada |
| 3 | Interacción con JavaScript: DOM, eventos, condicionales, bucles y validación | Cerrada |
| 4 | Integración: tema claro/oscuro global, formulario con Constraint Validation API, modal con Web Animations API | Cerrada (falta grabar el video) |

### Cifras actuales

| | |
|---|---|
| Páginas HTML | 4 |
| `css/estilos.css` | 1247 líneas · 60 tokens (+13 redefinidos en el tema oscuro) · 363 usos de `var()` |
| `js/interaccion.js` | 388 líneas · 3 interacciones (filtrado, formulario, modal) |
| `js/tema.js` | 151 líneas · selector de tema global (localStorage, y `?tema=` en `file://`) |
| Media queries | 3 (`40em`, `62em`, `prefers-reduced-motion`) |
| Dependencias externas | 1 (tipografías de Google Fonts) |
| Frameworks | ninguno |

---

## Reglas que se mantienen desde la Semana 1

1. **Ningún valor literal fuera de `:root`.** Si hace falta un valor nuevo,
   primero se agrega como token.
2. **El elemento se elige por lo que significa, no por cómo se ve.** Por eso
   `<a>` cuando navega y `<button>` cuando la acción se queda en la página; por
   eso `<aside>` y no `<div class="sidebar">`.
3. **No se oculta contenido en móvil.** El layout se reordena, no se recorta.
4. **Ningún estado se comunica solo por color.**
5. **Mejora progresiva.** Desde la Semana 3 hay JavaScript, pero las páginas
   siguen siendo utilizables sin él.

---

## Pendientes abiertos

| Pendiente | Desde | Nota |
|---|---|---|
| `aria-expanded` en el menú hamburguesa | Semana 1 | Ya es posible: hay JavaScript desde la Semana 3 |
| Subtítulos `.vtt` en la clase muestra | Semana 1 | El clip actual es de muestra, sin diálogo real |
| Los filtros no se reflejan en la URL | Semana 3 | Un resultado filtrado no se puede compartir por enlace |

Cerrados en la Semana 4: el favicon (ya no hay 404 en consola) y el foco poco visible sobre el
encabezado oscuro (de 2.34:1 a 7.82:1).
