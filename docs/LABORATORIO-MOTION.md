# Laboratorio — Framer Motion en la Card de experiencia

Animación de la misma `ExperienceCard` de la semana 9. El contrato de datos no
cambió: `Experience` y las props de la tarjeta son las mismas.

## Qué se implementó

| Reto de la guía | Archivo | Resultado |
|---|---|---|
| 1. Aparición en pantalla | `src/componentes/ExperienceCard.tsx` | `whileInView` con `once: true`; entra en unos 317 ms |
| 2. Hover y tap | `ExperienceCard.tsx`, `src/componentes/Boton.tsx` | La tarjeta sube 3 px; los botones bajan a escala 0,97 al pulsarlos |
| 3. Variants | `src/animaciones/tarjeta.ts` | Estados tipados con `Variants`, compartidos por todo el catálogo |
| 4. Movimiento reducido | `ExperienceCard.tsx`, `Boton.tsx` | `useReducedMotion`: tarjetas visibles desde el inicio y sin efectos |
| 5. Pruebas | [`evidencias-motion/`](evidencias-motion/) | Mouse, teclado y emulación táctil |

**Microinteracción accesible:** la estrella del botón de favorito hace un pulso
breve al marcarla. El estado lo comunican la etiqueta y `aria-pressed`, no el
movimiento.

## Decisiones técnicas

- **Sin `scale` en la tarjeta:** el ejemplo usa `scale: 1.01`, pero puede dejar el texto borroso. Se usa solo desplazamiento vertical.
- **Animaciones CSS retiradas:** `entrada-tarjeta` y los `transform` de `.curso:hover` y `button.boton:active` competían con Motion. La sombra se mantiene en CSS.
- **Señal de foco:** `whileFocus` no sirve porque el `article` no recibe foco. La tarjeta muestra su sombra con `.curso:has(:focus-visible)`.
- **Escalonado por columna:** depende de `posicion % 2`, para que las últimas tarjetas no esperen más que las primeras.
- **Peso del paquete:** se usan `LazyMotion` y `m`, y las funciones se cargan en un archivo aparte.
- **Fallo de carga:** si ese archivo no llega, la clase `.sin-animaciones` muestra las tarjetas. Sin ella quedarían invisibles.
- **Hover en táctil:** el color del botón secundario y la sombra de la tarjeta solo aplican con `@media (hover: hover)`. Antes, un botón ya desmarcado seguía azul tras el toque.

| Opción medida | JavaScript principal (gzip) | Cambio |
|---|---|---|
| Antes de Motion | 96,86 kB | — |
| `motion` completo | 142,13 kB | +47 % |
| `LazyMotion` en el mismo archivo | 127,75 kB | +32 % |
| **`LazyMotion` en archivo aparte (elegida)** | **110,63 kB** + 18,90 kB aparte | **+14 %** |

## Efectos descartados

- **Arrastre (drag):** la guía lo deja como opcional. No aporta nada al usuario del catálogo, porque no hay nada que ordenar ni descartar, y competiría con el desplazamiento vertical en móvil.
- **`scale` en la tarjeta:** descartado por la legibilidad del texto.
- **Animación de salida al filtrar:** retrasaría la lista justo cuando el usuario quiere ver el resultado.

## Protocolo de pruebas

Ejecutado sobre la compilación de producción con Chrome sin interfaz. Datos
completos en [`resultados.json`](evidencias-motion/resultados.json).

| Prueba | Resultado medido | Cumple |
|---|---|---|
| Entrada | La tarjeta aparece en 317 ms, con 17 cuadros intermedios | Sí |
| Hover | Sube 3 px, escala 1, sin saltos de diseño; vuelve a 0 al salir | Sí |
| Tap | Escala 0,97 al pulsar y 1 al soltar; abre el temario y fija `?curso=react` | Sí |
| Viewport | 2 tarjetas visibles al cargar y 14 esperando; las 16 aparecen al recorrer; no se repite al volver | Sí |
| Teclado | 24 paradas con Tab, todas con anillo de foco; ninguna en una tarjeta invisible; Enter activa los botones | Sí |
| Movimiento reducido | Las 16 visibles sin desplazarse; sin transformaciones en hover, tap ni estrella; el favorito funciona | Sí |
| Responsive | Sin scroll horizontal en 1280, 768 y 375 px; deslizar sobre la tarjeta mueve unos 205 px, igual que el control | Sí |
| Integración | 16 tarjetas con datos reales; filtros, búsqueda, favoritos y `?curso=id` funcionan; 5 rutas sin errores en consola | Sí |

**Auditorías:**
- **axe-core:** 0 violaciones en 20 combinaciones (5 rutas × tema claro y oscuro × escritorio y móvil).
- **Lighthouse (build local):** rendimiento de 97 en móvil y 100 en escritorio; accesibilidad, buenas prácticas y SEO en 100. Informes en [`lighthouse/`](lighthouse/).

**Límites de estas pruebas:** el táctil y el movimiento reducido se emularon en
Chrome. No se probaron en un teléfono físico ni con un lector de pantalla real.

**Prueba de movimiento reducido:** se activó la preferencia
`prefers-reduced-motion: reduce` y se recargó el explorador. Las tarjetas se
mostraron de inmediato y no hubo desplazamiento en hover ni escala al pulsar.
Captura: [`04-movimiento-reducido.png`](evidencias-motion/04-movimiento-reducido.png).

## Reflexión breve

La microinteracción que más valor aporta es la respuesta al pulsar los botones
junto con el pulso de la estrella del favorito. Confirma de inmediato que la
acción se registró, y eso es útil sobre todo en móvil, donde no existe el
hover. Además, no se depende de ella: la etiqueta y `aria-pressed` siguen
comunicando el estado aunque se desactive el movimiento.

El efecto descartado fue el arrastre. Era vistoso, pero el catálogo no tiene
nada que ordenar y podría estorbar el desplazamiento en móvil. También se quitó
el `scale` de la tarjeta por la nitidez del texto. Las pruebas enseñaron algo
más: el peso importa, porque Motion completo aumentaba el JavaScript en 47 %, y
el hover pegado en táctil solo se descubrió al mirar una captura.

## Preguntas de análisis

1. **¿Qué intención de usuario comunica la animación de entrada?** Indica que el contenido acaba de llegar y dónde mirar. Tras la carga, marca el paso de los esqueletos a los cursos reales.
2. **¿Qué diferencia hay entre una animación decorativa y una microinteracción útil?** La decorativa solo adorna; si se quita, nada cambia. La útil responde a una acción y da información, como confirmar que un botón se pulsó.
3. **¿Por qué hover no es suficiente en dispositivos táctiles?** Porque no hay puntero. Además, el `:hover` de CSS puede quedarse pegado tras un toque, como pasó aquí con el botón de favorito. Por eso hay respuesta al pulsar y estados con texto.
4. **¿Qué problemas puede generar animar demasiados elementos al desplazarse?** Distrae, retrasa la lectura, consume CPU y batería, y puede marear. Por eso cada tarjeta se anima una sola vez, con `once: true`, y no se repite al volver.
5. **¿Cómo se relaciona la Card tipada con la Card animada?** Es el mismo componente. TypeScript garantiza los datos y Motion añade la respuesta visual sin cambiar `Experience` ni las props. Las animaciones también están tipadas, con `Variants`.

## Pendiente

- Grabar el video con entrada, hover/tap, responsive y prueba de teclado.
- Probar en un teléfono físico.
