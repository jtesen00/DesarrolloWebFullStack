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
