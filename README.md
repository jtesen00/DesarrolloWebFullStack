# Wayra Academy — Plataforma de Cursos y Talleres en Línea

Wayra Academy es una plataforma educativa web peruana para el aprendizaje interactivo de tecnología, diseño y negocios con instructores locales verificados. Esta versión corresponde a la migración a **React 19 + Vite 8 + React Router DOM 7** con el **rediseño v3 («Tech»)**: interfaz rectangular, tipografía Geist, tema claro/oscuro y animaciones que respetan «reducir movimiento».

## Requisitos y ejecución

Para ejecutar o compilar el proyecto en un entorno local con Node.js instalado:

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
3. **Compilar para producción**:
   ```bash
   npm run build
   ```
4. **Previsualizar la compilación de producción**:
   ```bash
   npm run preview
   ```

## Estructura de carpetas (`src/`)

```
src/
├── App.jsx                     # Enrutador principal, rutas y página 404
├── main.jsx                    # Punto de entrada de React con StrictMode y hoja de estilos
├── estilos.css                 # Sistema de diseño v3: tokens claro/oscuro, componentes y animaciones
├── componentes/                # Componentes funcionales reutilizables
│   ├── BloqueLateral.jsx       # Bloque de la columna lateral (superficie, acción o recomendación)
│   ├── Boton.jsx               # Botón reutilizable (<Link>, <a> o <button>) con variantes
│   ├── BotonTema.jsx           # Interruptor accesible (aria-pressed) para modo claro/oscuro
│   ├── CabeceraPagina.jsx      # Cabecera de páginas internas: migas, h1 e intro
│   ├── Carrusel.jsx            # Carrusel accesible con teclado, puntos y aria-live
│   ├── Chakana.jsx             # Marca andina en SVG (usa currentColor)
│   ├── CifraAnimada.jsx        # Contador que sube hasta el valor al entrar en pantalla
│   ├── CuentaRegresiva.jsx     # Temporizador al próximo inicio, con setInterval
│   ├── CursoMosaico.jsx        # Tarjeta del mosaico de cursos destacados
│   ├── Encabezado.jsx          # Navegación, enlace activo (NavLink), tema y menú móvil
│   ├── Layout.jsx              # Estructura común; al navegar: scroll arriba y foco al <h1>
│   ├── ListaLateral.jsx        # Lista de datos y apuntes (numerada o simple)
│   ├── ModalAcceso.jsx         # <dialog> nativo con animación de entrada
│   ├── Monitor.jsx             # Monitor de tiempo de estudio (setInterval + controles)
│   ├── Pie.jsx                 # Pie de página institucional
│   ├── ReproductorMuestra.jsx  # Maqueta animada de la clase en vivo (portada)
│   ├── Saludo.jsx              # Saludo según la hora, con props
│   └── TarjetaCurso.jsx        # Tarjeta del explorador con temario desplegable
├── datos/
│   └── cursos.js               # 16 cursos, categorías, niveles y fechas de inicio (formato automático)
├── hooks/
│   ├── useAparicion.js         # Aparición de bloques al desplazarse (IntersectionObserver)
│   ├── useCargaSimulada.js     # Simulación asíncrona de carga con temporizador
│   └── useTema.js              # Persistencia del tema; cambio con View Transitions
└── paginas/
    ├── AsesorVirtual.jsx       # Test interactivo con validación y ruta recomendada
    ├── ClaseMuestra.jsx        # Clase de muestra en video, contenido y monitor de estudio
    ├── ExploradorCursos.jsx    # Filtros en vivo, búsqueda sin tildes y enlace profundo ?curso=id
    ├── Inicio.jsx              # Portada: hero, cifras, mosaico, carrusel, pasos, agenda y CTA
    └── NoEncontrada.jsx        # Página 404
```

## Cumplimiento de requerimientos

| Requerimiento | Archivo(s) de implementación | Descripción |
| :--- | :--- | :--- |
| **Componente funcional reutilizable** | `src/componentes/Boton.jsx`, `BloqueLateral.jsx`, `CursoMosaico.jsx`, `TarjetaCurso.jsx`, `ListaLateral.jsx` | Bloques modulares que reciben propiedades para desacoplar presentación y lógica. |
| **Saludo con props** | `src/componentes/Saludo.jsx` | Componente que recibe `nombre` y `mensaje` vía props, calculando el saludo según la hora. |
| **Componente interactivo con `useState`** | `src/componentes/Carrusel.jsx`, `src/paginas/ExploradorCursos.jsx`, `src/paginas/AsesorVirtual.jsx` | Control de estado para diapositivas, filtros en vivo, respuestas de formulario y validación. |
| **Evento `onClick`** | `src/componentes/Boton.jsx`, `BotonTema.jsx`, `Carrusel.jsx`, `ModalAcceso.jsx` | Controladores de eventos para navegación, cambio de tema, cambio de diapositivas y cierre. |
| **Composición** | `src/componentes/Layout.jsx`, `src/paginas/Inicio.jsx` | Uso de `<Outlet />` y jerarquía de componentes para estructurar vistas completas. |
| **`useEffect` + `setTimeout`** | `src/hooks/useCargaSimulada.js` (utilizado en `src/paginas/ExploradorCursos.jsx`) | Simulación de retraso de red al consultar el catálogo de cursos antes de mostrarlos. |
| **`setInterval`** | `src/componentes/CuentaRegresiva.jsx` | Actualización periódica cada segundo del contador hacia la próxima fecha de inicio. |
| **Limpieza `clearTimeout` / `clearInterval`** | `src/hooks/useCargaSimulada.js`, `src/componentes/CuentaRegresiva.jsx` | Funciones de saneamiento retornadas en `useEffect` para prevenir fugas de memoria. |
| **Presentación coherente** | `src/estilos.css` | Sistema de diseño v3 con tokens CSS (colores, tipografía, espacio) y tema oscuro por redefinición de tokens. |
| **`setInterval` / `clearInterval` con controles** | `src/componentes/Monitor.jsx` (en `src/paginas/ClaseMuestra.jsx`) | Monitor «Tu tiempo de estudio» con botones Activar, Detener y Reiniciar; el efecto depende de `[activo]` y limpia el intervalo. |
| **`useRef` en la búsqueda** | `src/paginas/ExploradorCursos.jsx` | El botón «Limpiar filtros» usa una referencia a `input#busqueda-curso` para devolver el foco. |
| **Búsqueda sin tildes** | `src/paginas/ExploradorCursos.jsx` | La función `normalizar` ignora tildes y mayúsculas al comparar el texto buscado. |

## Rediseño v3: accesibilidad, foco y animaciones

- **Navegación entre páginas** (`Layout.jsx`): al cambiar de ruta se vuelve arriba sin animar y el foco pasa al `<h1>` de la página nueva, de modo que teclado y lector de pantalla no se quedan en un enlace que ya no existe. En la primera carga no se roba el foco. Los anclas (`/#agenda`, `#pie`) bajan suavemente y enfocan su destino.
- **Animaciones**: entrada de página, aparición al desplazarse (`useAparicion`), cifras que cuentan (`CifraAnimada`), maqueta del reproductor que «escribe» su código, tarjetas escalonadas, temario con transición de altura (`::details-content`), menú móvil, enlace activo y cambio de tema con View Transitions. Son mejora progresiva: con «reducir movimiento», sin `IntersectionObserver` o sin soporte, el contenido se ve completo y sin movimiento.
- **Resultados de auditoría** (Playwright + axe-core, WCAG 2.2 AA y buenas prácticas): 0 violaciones en 5 rutas × tema claro/oscuro × escritorio/móvil.
- **Datos de muestra**: los cursos, instructores y fechas de inicio son de ejemplo. Las fechas se editan en `INICIOS` de `src/datos/cursos.js`.

## Laboratorio: efectos, temporizadores y referencias

### Cambios realizados

- **Monitor de estudio** (`src/componentes/Monitor.jsx`): usa `useState`, `useEffect`, `setInterval` y `clearInterval`, con controles Activar, Detener y Reiniciar. El efecto depende de `[activo]` y limpia el intervalo, por lo que nunca existen dos intervalos a la vez y el contador no se acelera. Se actualiza con la forma funcional `setSegundos(p => p + 1)`.
- **Búsqueda sin tildes** (`src/paginas/ExploradorCursos.jsx`): la función `normalizar` permite que «diseno» encuentre «Diseño».
- **Botón «Limpiar filtros»** (antes «Limpiar búsqueda»): usa `useRef` sobre `input#busqueda-curso` para devolver el foco al campo.
- **Hook personalizado**: no se creó uno nuevo. Se conservan `useCargaSimulada`, que aísla la simulación de red y es reutilizable por cualquier página que reciba datos (pasar a una API real solo modifica el hook), y `useTema`. Un hook para el monitor no aportaría una reutilización clara.

### Pruebas realizadas

| Prueba | Valor medido | Resultado |
| :--- | :--- | :--- |
| Activar y esperar 5 s reales | 0 → 5 s en 5,02 s (~1 por segundo) | Pasa |
| Detener/Activar 3 veces seguidas y esperar 5 s (con `StrictMode`) | 5 → 10 (+5 en 5 s): no se acelera | Pasa |
| Detener y esperar 3 s | 10 → 10, «Monitor detenido» | Pasa |
| Reiniciar | `00:00`, «Monitor detenido · 0 s registrados» | Pasa |
| Buscar «diseno» | 1 curso: «Diseño UX/UI para producto digital» | Pasa |
| Limpiar búsqueda | Campo vacío y foco en `#busqueda-curso` | Pasa |

Las capturas están en `docs/evidencias-laboratorio/` (`01-monitor-activo.png` … `05-busqueda-limpia-foco.png`) junto con `resultados.json`.

### Limitaciones

- La carga simulada no es una API real.
- El monitor no persiste al recargar ni al cambiar de página.
- `setInterval` puede retrasarse en pestañas en segundo plano.
- La búsqueda solo mira el título del curso.

### Entrega

- **Repositorio**: https://github.com/jtesen00/DesarrolloWebFullStack
- **Rama de laboratorio**: `react`
- **Commit base de Desarrollo Web**: `93dd62e` (Migrar el sitio a React con Vite)
- **Video explicativo**: _(pendiente de enlazar)_
