# Guía de Laboratorio N.° 1

**Experiencias Web Inmersivas · Semana 1**
**Etapa 2: IMPLEMENTAR, EJECUTAR, VALIDAR Y CORREGIR**

Fecha: sábado 5 de septiembre del 2026.

| | |
|---|---|
| Modalidad | Laboratorio grupal |
| Duración sugerida | 3 horas |
| Entrada obligatoria | Especificación del prototipo |
| Tecnologías | HTML5 + CSS3 |
| Producto | Prototipo ejecutable y validado |
| Herramientas | VS Code + navegador + validadores |

Transcripción fiel del PDF entregado por el docente, guardada aquí para que
quede versionada junto al resto del contexto del proyecto. El documento
original en PDF es la fuente autoritativa ante cualquier duda de formato.

---

## 1. Propósito

Convertir en código las decisiones tomadas en la Guía de Trabajo Grupal. En
esta etapa el equipo construirá el prototipo con HTML5 y CSS3, lo ejecutará
en el navegador, validará su estructura y realizará una revisión inicial de
accesibilidad.

**Importante:** no deben volver a diseñar el prototipo desde cero. La
especificación del trabajo grupal ([PROMPT-IMPLEMENTACION.md](PROMPT-IMPLEMENTACION.md))
es la entrada de esta práctica.

## 2. Flujo de trabajo

Trabajo grupal → Especificación → Implementación → Ejecución → Validación →
Corrección → Evidencias

Si durante la implementación descubren que una decisión del trabajo grupal no
funciona, pueden modificarla, pero deben registrar qué cambiaron y por qué.

## 3. Herramientas de software

| Herramienta | Uso en el laboratorio | Evidencia |
|---|---|---|
| Visual Studio Code | Crear y editar archivos HTML/CSS | Captura del proyecto |
| Chrome o Edge | Ejecutar e inspeccionar | Captura de la página |
| Validador HTML de W3C | Comprobar el marcado | Resultado y correcciones |
| axe DevTools | Revisar accesibilidad | Hallazgos y correcciones |

## 4. Actividad 0 — Recuperar la especificación del equipo

Antes de escribir código, abran la Especificación del Primer Prototipo
elaborada en la Guía de Trabajo Grupal.

- Identifiquen las cinco regiones definidas.
- Revisen las etiquetas semánticas propuestas.
- Revisen el contenido de las tres experiencias.
- Revisen las decisiones de accesibilidad.
- Revisen las tres decisiones técnicas que deben demostrar.

**Resultado:** el equipo debe comenzar la implementación a partir de un
diseño previamente acordado.

## 5. Actividad 1 — Crear la estructura del proyecto

Tiempo sugerido: 15 minutos.

```
plataforma-experiencias/
├── index.html
├── css/
│   └── styles.css
└── img/
```

Crear los archivos y vincular correctamente la hoja de estilos.

> Nota del equipo: los nombres reales del proyecto (`css/estilos.css`, BEM en
> español) vienen de una decisión ya tomada y documentada en
> [PROMPT-IMPLEMENTACION.md](PROMPT-IMPLEMENTACION.md) antes de esta guía; el
> árbol de arriba es el ejemplo genérico de la guía, no un nombre obligatorio.

## 6. Actividad 2 — Implementar la estructura semántica

Tiempo sugerido: 35 minutos.

Trasladen la estructura definida en la guía grupal al archivo `index.html`.
Utilicen las etiquetas que el equipo justificó.

```html
<header>...</header>
<nav>...</nav>
<main>
  <section>
    <article>...</article>
    <article>...</article>
    <article>...</article>
  </section>
</main>
<footer>...</footer>
```

No copien una plantilla sin analizarla: comparen cada etiqueta con la
decisión registrada por el equipo.

## 7. Actividad 3 — Implementar las tres experiencias

Tiempo sugerido: 25 minutos.

Utilicen exactamente el contenido acordado en la especificación: título,
descripción, imagen/recurso y acción.

**Comprobación del equipo:** ¿las tres experiencias corresponden realmente a
lo que se definió en la guía grupal?

## 8. Actividad 4 — Aplicar CSS

Tiempo sugerido: 40 minutos.

Apliquen mediante `styles.css` la propuesta visual definida por el equipo.
Como mínimo:

- Tipografía y tamaños.
- Colores de texto y fondo.
- `margin` y `padding`.
- Bordes y/o bordes redondeados.
- Distribución de las experiencias.
- Estilos diferenciados para navegación, títulos y tarjetas.

Pueden utilizar variables CSS para centralizar valores visuales:

```css
:root {
  --primary-color: #2f6fab;
  --text-color: #222;
  --background-color: #f5f7fa;
}
```

## 9. Actividad 5 — Ejecutar e inspeccionar

Tiempo sugerido: 15 minutos.

1. Abrir `index.html` en el navegador.
2. Verificar que CSS se aplica.
3. Usar DevTools → Inspect para identificar elementos.
4. Modificar temporalmente una propiedad CSS y observar el resultado.
5. Comparar la implementación con el boceto del trabajo grupal.

Registren al menos una diferencia entre el diseño previsto y el resultado
implementado, si existe.

## 10. Actividad 6 — Validar y corregir HTML

Tiempo sugerido: 20 minutos.

Ejecuten la validación HTML. Registren los problemas y corrijan el código.

| Problema | Causa | Corrección | Resultado |
|---|---|---|---|
| | | | |

## 11. Actividad 7 — Auditar accesibilidad

Tiempo sugerido: 25 minutos.

Ejecuten axe DevTools. Revisen los hallazgos y relacionen cada uno con las
decisiones de accesibilidad planteadas en la Guía de Trabajo Grupal.

| Hallazgo | Impacto | Corrección | Verificación |
|---|---|---|---|
| | | | |

## 12. Actividad 8 — Comparar decisión vs. implementación

Este paso evita que el laboratorio sea solamente "hacer código". Revisen las
tres decisiones técnicas tomadas en el trabajo grupal.

| Decisión original | ¿Se implementó? | Evidencia | ¿Fue necesario modificarla? ¿Por qué? |
|---|---|---|---|
| | | | |

## 13. Reto de laboratorio — "Haz que funcione y demuestra por qué"

El equipo debe presentar el prototipo funcionando y demostrar una cadena
completa: una decisión tomada en la guía grupal, su implementación en
HTML/CSS, la evidencia en el navegador y, cuando corresponda, su validación o
corrección.

Ejemplo: "Decidimos usar `<article>` para cada experiencia porque cada
experiencia constituye una unidad de contenido independiente. Aquí está la
implementación y aquí la evidencia en el navegador."

## 14. Entregables del laboratorio

- Carpeta completa del proyecto.
- `index.html`.
- `css/styles.css`.
- Tres o más experiencias implementadas.
- Captura del prototipo ejecutándose.
- Evidencia de validación HTML y correcciones.
- Evidencia de auditoría de accesibilidad y correcciones.
- Tabla decisión → implementación → evidencia.
- Prototipo final de la sesión.
- Exposición vía video, no más de 15 minutos.

## 15. Lista de verificación

| Criterio | Sí | Parcial | No |
|---|---|---|---|
| La implementación corresponde a la especificación grupal. | ☐ | ☐ | ☐ |
| HTML5 semántico correctamente estructurado. | ☐ | ☐ | ☐ |
| Tres o más experiencias implementadas. | ☐ | ☐ | ☐ |
| CSS externo correctamente vinculado. | ☐ | ☐ | ☐ |
| Estilos básicos aplicados. | ☐ | ☐ | ☐ |
| Criterios iniciales de accesibilidad aplicados. | ☐ | ☐ | ☐ |
| HTML validado y corregido. | ☐ | ☐ | ☐ |
| Auditoría de accesibilidad realizada. | ☐ | ☐ | ☐ |
| Las decisiones técnicas pueden demostrarse con evidencia. | ☐ | ☐ | ☐ |

## 16. Reflexión final

- ¿Qué decisión del trabajo grupal pude implementar con mayor facilidad?
- ¿Qué decisión tuve que modificar durante el laboratorio y por qué?
- ¿Qué problema detecté mediante una herramienta de validación?
- ¿Qué aprendí al convertir una especificación en código?

Respuesta:

________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________

## 17. Conexión con la siguiente etapa

El prototipo implementado será la base para evolucionar el proyecto. En las
siguientes semanas se incorporarán progresivamente JavaScript, componentes
con React, estado, APIs y otras capacidades. Por tanto, lo realizado hoy no
es un ejercicio aislado: es la primera versión técnica del producto del
curso.

> "En el trabajo grupal decidimos. En el laboratorio construimos y
> comprobamos."
