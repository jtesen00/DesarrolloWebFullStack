# Semana 9 — TypeScript en React

Migración progresiva de Wayra Academy a TypeScript y tarjeta de experiencia
tipada. En este proyecto, cada «experiencia» de la plataforma es un curso.

## Qué se implementó

| Actividad de la guía | Archivo | Resultado |
|---|---|---|
| 1. Modelo de datos | `src/types/experience.ts` | `Experience`, `ExperienceCategory` y `ExperienceLevel`, definidos una sola vez |
| 2. Props de la tarjeta | `src/componentes/ExperienceCard.tsx` | Reemplaza a `TarjetaCurso`; `onSelect` y la imagen son opcionales |
| 3. Estado y eventos | `src/hooks/useFavoritos.ts` | Favorito con `aria-pressed`, etiqueta que cambia y `useState<string[]>` |
| 4. Colección tipada | `src/datos/cursos.ts` | `CURSOS: Experience[]`, renderizado con `map` y `key={curso.id}` |
| 5. Migración de componentes | `Boton`, `Chakana`, `CabeceraPagina`, `useCargaSimulada`, `ExploradorCursos` | Pasados a `.ts`/`.tsx`; el resto sigue en JavaScript gracias a `allowJs` |
| Reto | `ExploradorCursos.tsx` | La misma tarjeta muestra los 16 cursos del catálogo |

## Decisiones respecto a la guía

- **`id` de tipo `string`:** los cursos usan ids como `"react"`, que también alimentan el enlace `?curso=id`.
- **Categorías de Wayra:** se usan las cuatro del catálogo en lugar de `evento | lugar | producto`. `Record<ExperienceCategory, string>` obliga a dar una etiqueta a cada una.
- **Favoritos en un hook:** los filtros desmontan las tarjetas, así que un `useState` dentro de la tarjeta perdería el valor. El estado vive en `useFavoritos` y se recuerda con `localStorage`.
- **Valoración accesible:** el ejemplo usa `aria-label` sobre un `<p>`, que no se anuncia de forma fiable. Aquí se usa texto con `.visualmente-oculto`.
- **Comprobación de tipos en el build:** Vite elimina los tipos sin revisarlos, por eso `npm run build` ejecuta antes `tsc --noEmit`.
- **Datos de muestra:** las 16 valoraciones son de ejemplo. Solo el curso `frontend` tiene imagen; los otros 15 muestran la alternativa con la chakana.

## Criterios de aceptación

| Prueba | Evidencia | Cumple |
|---|---|---|
| Compilación | `npm run typecheck` y `npm run build` terminan sin errores | Sí |
| Datos | `CURSOS: Experience[]`; TypeScript señaló los 16 cursos cuando aún no tenían `valoracion` | Sí |
| Props | `ExperienceCard` recibe `item` tipado y se reutiliza en 16 cursos | Sí |
| Estado | El favorito cambia de etiqueta y de `aria-pressed`, y se conserva al filtrar y al recargar | Sí |
| Campos opcionales | 1 tarjeta con imagen y 15 con alternativa visual | Sí |
| Regresión | Las 5 rutas cargan sin errores en consola; búsqueda sin tildes, limpiar filtros, foco y `?curso=id` siguen funcionando | Sí |
| Código | 0 usos de `any`; los tipos del curso se definen en un solo archivo | Sí |

Capturas y resultados medidos: [`evidencias-semana-9/`](evidencias-semana-9/).

## Comentario breve

TypeScript ayuda a detectar errores antes de ejecutar la aplicación. El primero
apareció durante esta migración: al declarar `CURSOS` como `Experience[]`, el
compilador señaló los 16 cursos porque aún no tenían el campo obligatorio
`valoracion`. En JavaScript, ese fallo se habría visto recién en el navegador,
al intentar mostrar la nota de una tarjeta. El segundo error es el uso de
valores no contemplados: como `categoria` es una unión de cuatro textos,
escribir `"disenio"` no compila, mientras que antes habría producido una
etiqueta vacía sin ningún aviso. También evita acceder a valores que pueden no
existir, como el resultado de `CURSOS.find`.

Sin embargo, TypeScript solo revisa el código, no lo que sucede al ejecutarlo.
El tipo `number` acepta una valoración de 9 aunque la escala llegue a 5, y los
datos leídos de `localStorage` pueden tener cualquier forma; por eso
`useFavoritos` los valida al leerlos. Tampoco garantiza que el botón sea
accesible, que la imagen se vea bien o que el favorito se conserve al filtrar.
De hecho, un recorte incorrecto de la imagen pasó la compilación y solo se
descubrió al revisar las capturas. Esas conductas todavía requieren pruebas
funcionales y visuales.

## Preguntas de reflexión

1. **¿Qué error concreto se detecta gracias a `Experience`?** Un curso sin `valoracion`, una valoración escrita como texto (`"4.5"`) o una categoría que no existe. Los tres fallan al compilar.
2. **¿Cuándo usar `interface` y cuándo `type`?** `interface` para la forma de un objeto, como `Experience` o las props. `type` para uniones y combinaciones, como `ExperienceCategory` o `BotonProps`.
3. **¿Por qué es riesgoso `any`?** Apaga la comprobación y el error reaparece al ejecutar, cuando ya lo ve el usuario. Además se propaga a todo lo que usa ese valor. Si el tipo se desconoce, es mejor `unknown` y validarlo, como hace `useFavoritos`.
4. **¿Qué no se puede validar solo con TypeScript?** Rangos de valores, datos externos, accesibilidad real, diseño y comportamiento. Las conversiones con `as` en los filtros tampoco se comprueban al ejecutar: funcionan porque las opciones del `<select>` están escritas a mano.
5. **¿Cómo se coordina con el laboratorio inmersivo?** Framer Motion se añadirá por fuera del contrato: `Experience` y las props actuales no cambian. Habrá que reemplazar la animación CSS de entrada (`--i`) en lugar de sumarle otra, y respetar «reducir movimiento».

## Pendiente

- Grabar el video de exposición de 8 a 10 minutos.
- Seguir migrando los componentes que quedan en JavaScript.
- Confirmar con el docente el procedimiento de conversión, como pide la guía.
