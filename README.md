# Wayra Academy — Plataforma de Cursos y Talleres en Línea

Wayra Academy es una plataforma educativa web peruana para el aprendizaje interactivo de tecnología, diseño y negocios con instructores locales verificados. Esta versión corresponde a la migración completa a **React 19 + Vite 8 + React Router DOM 7**, manteniendo fidelidad semántica, accesibilidad y el sistema de diseño original en CSS moderno.

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
├── App.jsx                     # Enrutador principal de la aplicación y definición de rutas
├── main.jsx                    # Punto de entrada de React con StrictMode y hoja de estilos
├── estilos.css                 # Hoja de estilos original con sistema de diseño por tokens
├── componentes/                # Componentes funcionales reutilizables
│   ├── BloqueLateral.jsx       # Contenedor de sección de barra lateral con título
│   ├── Boton.jsx               # Botón de acción reutilizable (enlace o botón nativo)
│   ├── BotonTema.jsx           # Interruptor accesible para modo claro/oscuro
│   ├── CabeceraPagina.jsx      # Cabecera de páginas secundarias con enlace de retorno y título
│   ├── Carrusel.jsx            # Carrusel interactivo accesible con teclado y controles
│   ├── CuentaRegresiva.jsx     # Temporizador con actualización por segundo
│   ├── Encabezado.jsx          # Navegación superior y apertura del modal
│   ├── Layout.jsx              # Estructura compartida (header, main/aside, pie, modal)
│   ├── ListaLateral.jsx        # Lista de datos y apuntes para la columna lateral
│   ├── ModalAcceso.jsx         # Ventana modal nativa dialog con animación accesible
│   ├── Monitor.jsx             # Monitor de tiempo de estudio con setInterval y controles
│   ├── Pie.jsx                 # Pie de página institucional y enlaces
│   ├── Saludo.jsx              # Saludo contextual según la hora del día con props
│   ├── TarjetaCurso.jsx        # Tarjeta de curso con detalles y temario desplegable
│   └── TarjetaExperiencia.jsx  # Tarjeta de acceso a experiencias interactivas
├── datos/
│   └── cursos.js               # Catálogo de cursos, categorías, niveles y fechas de inicio
├── hooks/
│   ├── useCargaSimulada.js     # Hook para simulación asíncrona de datos con temporizador
│   └── useTema.js              # Hook para persistencia y sincronización del tema claro/oscuro
└── paginas/
    ├── AsesorVirtual.jsx       # Página del test interactivo con validación y ruta
    ├── ClaseMuestra.jsx        # Página de reproducción de clase de muestra en video
    ├── ExploradorCursos.jsx    # Página de filtrado en vivo y búsqueda de cursos
    └── Inicio.jsx              # Página de bienvenida, experiencias y destacados
```

## Cumplimiento de requerimientos

| Requerimiento | Archivo(s) de implementación | Descripción |
| :--- | :--- | :--- |
| **Componente funcional reutilizable** | `src/componentes/Boton.jsx`, `BloqueLateral.jsx`, `TarjetaExperiencia.jsx`, `TarjetaCurso.jsx`, `ListaLateral.jsx` | Bloques modulares que reciben propiedades para desacoplar presentación y lógica. |
| **Saludo con props** | `src/componentes/Saludo.jsx` | Componente que recibe `nombre` y `mensaje` vía props, calculando el saludo según la hora. |
| **Componente interactivo con `useState`** | `src/componentes/Carrusel.jsx`, `src/paginas/ExploradorCursos.jsx`, `src/paginas/AsesorVirtual.jsx` | Control de estado para diapositivas, filtros en vivo, respuestas de formulario y validación. |
| **Evento `onClick`** | `src/componentes/Boton.jsx`, `BotonTema.jsx`, `Carrusel.jsx`, `ModalAcceso.jsx` | Controladores de eventos para navegación, cambio de tema, cambio de diapositivas y cierre. |
| **Composición** | `src/componentes/Layout.jsx`, `src/paginas/Inicio.jsx` | Uso de `<Outlet />` y jerarquía de componentes para estructurar vistas completas. |
| **`useEffect` + `setTimeout`** | `src/hooks/useCargaSimulada.js` (utilizado en `src/paginas/ExploradorCursos.jsx`) | Simulación de retraso de red al consultar el catálogo de cursos antes de mostrarlos. |
| **`setInterval`** | `src/componentes/CuentaRegresiva.jsx` | Actualización periódica cada segundo del contador hacia la próxima fecha de inicio. |
| **Limpieza `clearTimeout` / `clearInterval`** | `src/hooks/useCargaSimulada.js`, `src/componentes/CuentaRegresiva.jsx` | Funciones de saneamiento retornadas en `useEffect` para prevenir fugas de memoria. |
| **Presentación coherente** | `src/estilos.css` (reutilizado) | Adopción de la hoja de estilos original y sus variables CSS personalizadas sin colores literales. |
| **`setInterval` / `clearInterval` con controles** | `src/componentes/Monitor.jsx` (en `src/paginas/Inicio.jsx`) | Monitor «Tu tiempo de estudio» con botones Activar, Detener y Reiniciar; el efecto depende de `[activo]` y limpia el intervalo. |
| **`useRef` en la búsqueda** | `src/paginas/ExploradorCursos.jsx` | El botón «Limpiar búsqueda» usa una referencia a `input#busqueda-curso` para devolver el foco. |
| **Búsqueda sin tildes** | `src/paginas/ExploradorCursos.jsx` | La función `normalizar` ignora tildes y mayúsculas al comparar el texto buscado. |

## Laboratorio: efectos, temporizadores y referencias

### Cambios realizados

- **Monitor de estudio** (`src/componentes/Monitor.jsx`): usa `useState`, `useEffect`, `setInterval` y `clearInterval`, con controles Activar, Detener y Reiniciar. El efecto depende de `[activo]` y limpia el intervalo, por lo que nunca existen dos intervalos a la vez y el contador no se acelera. Se actualiza con la forma funcional `setSegundos(p => p + 1)`.
- **Búsqueda sin tildes** (`src/paginas/ExploradorCursos.jsx`): la función `normalizar` permite que «diseno» encuentre «Diseño».
- **Botón «Limpiar búsqueda»**: usa `useRef` sobre `input#busqueda-curso` para devolver el foco al campo.
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
