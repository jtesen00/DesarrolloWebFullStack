# Wayra Academy — Guion del video · Semana 4, Planeación B

**Integrantes:** Chauca Machuca, Jhordi Fabian · Tesen Tantachuco, José Antonio · Patiño Ramos, Jorge Luis · Malpartida Sanchez, Yvette · Cherca Lopez, Raul

## Guion del video (≈ 7 min 20 s)

Este guion dice **qué hace cada integrante en su pantalla y qué dice, paso a paso**. Lo que está entre
comillas es el texto para decir. Pueden decirlo con sus palabras, pero **sin cambiar los datos**
(600 px, 592 px, «Curso 0 de 5», 48 combinaciones…): son mediciones reales del proyecto.

### 1 Preparación antes de grabar (10 minutos, una sola vez)

**Forma de grabar.** Reunión en Meet, Zoom o Teams, grabada. Cada integrante **comparte su propia
pantalla** cuando le toca y deja la **cámara encendida**. El nombre de cada uno en la reunión debe ser el
**nombre completo** (así aparece como rótulo): «Chauca Machuca, Jhordi Fabian», «Tesen Tantachuco, José
Antonio», «Patiño Ramos, Jorge Luis», «Malpartida Sanchez, Yvette», «Cherca Lopez, Raul».

**Cada integrante tiene listo, antes de empezar:**

| Qué | Cómo dejarlo listo |
|---|---|
| Proyecto abierto en VS Code | Carpeta `DesarrolloWebFullStack`. Zoom del editor en 150 % (`Ctrl` + `+` dos veces) para que el código se lea en el video. |
| Página funcionando | Clic derecho en `index.html` → **Open with Live Server**. Queda en `http://127.0.0.1:5500/index.html`. Sin Live Server: doble clic en `index.html`. |
| Navegador | Chrome o Edge, zoom al 100 %, **sin otras pestañas**, en tema claro, con el carrusel en el curso 1 (recargar con `F5`). |
| Documento | `docs/SEMANA-4-PLAN-B.docx` abierto (lo usan Raul y Jhordi). |
| Capturas | Carpeta `docs/evidencias-plan-b` abierta en el Explorador de Windows (la usa Raul). |
| Notificaciones | Desactivadas (Windows: *Asistente de concentración*). Cerrar WhatsApp y el correo. |

**Quién prepara qué en su pantalla:**

| Integrante | Deja abierto antes de su turno |
|---|---|
| Chauca Machuca, Jhordi Fabian | Navegador con `index.html` arriba del todo |
| Cherca Lopez, Raul | Documento en la sección 3 (matriz) + carpeta `evidencias-plan-b` + navegador con DevTools en «Consola» |
| Malpartida Sanchez, Yvette | VS Code con `index.html` en la **línea 141** + navegador con `index.html` |
| Patiño Ramos, Jorge Luis | VS Code con `css/estilos.css` en la **línea 1148** + navegador con `index.html` |
| Tesen Tantachuco, José Antonio | VS Code con `js/interaccion.js` en la **línea 397** + navegador con `index.html` |

Para ir a una línea en VS Code: `Ctrl` + `G`, escribir el número y `Enter`.

### 2 Resumen de turnos

| # | Tiempo | Bloque | Quién habla | Qué se ve |
|---|---|---|---|---|
| 1 | 0:00 – 0:45 | Presentación | Chauca Machuca, Jhordi Fabian | Cámaras de todos → página de inicio |
| 2 | 0:45 – 2:00 | Diagnóstico | Cherca Lopez, Raul | Matriz → capturas 01 a 04 |
| 3 | 2:00 – 2:40 | Decisión HTML | Malpartida Sanchez, Yvette | `index.html`, líneas 141–230 |
| 4 | 2:40 – 3:25 | Decisión responsive | Patiño Ramos, Jorge Luis | `estilos.css`, líneas 1148–1390 |
| 5 | 3:25 – 4:10 | Decisión JavaScript | Tesen Tantachuco, José Antonio | `interaccion.js`, líneas 397–452 |
| 6 | 4:10 – 5:00 | Demo del carrusel | Tesen Tantachuco, José Antonio | Navegador, sección «Cursos destacados» |
| 7 | 5:00 – 5:30 | Demo con teclado | Malpartida Sanchez, Yvette | Navegador, solo teclado |
| 8 | 5:30 – 6:05 | Demo responsive | Patiño Ramos, Jorge Luis | DevTools en modo dispositivo |
| 9 | 6:05 – 6:20 | Consola y pruebas | Cherca Lopez, Raul | Consola vacía → tabla de pruebas |
| 10 | 6:20 – 7:20 | Cierre | Los cinco | Cámaras |

Tiempo por persona: Jhordi ≈ 1:00 · Raul ≈ 1:45 · Yvette ≈ 1:25 · Jorge Luis ≈ 1:35 · José Antonio ≈ 1:45.

---

### 3 Bloque 1 · Presentación (0:00 – 0:45) — Chauca Machuca, Jhordi Fabian

**Al empezar:** nadie comparte pantalla; se ven las cinco cámaras.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Las cinco cámaras. Cada uno **levanta la mano o saluda** cuando Jhordi dice su nombre. | «Hola, somos el equipo de Wayra Academy. Yo soy **Jhordi Fabian Chauca Machuca** y me encargué de la coordinación. Conmigo están **José Antonio Tesen Tantachuco**, que hizo el JavaScript; **Jorge Luis Patiño Ramos**, el CSS y el responsive; **Yvette Malpartida Sanchez**, el HTML y la accesibilidad; y **Raul Cherca Lopez**, las pruebas y la documentación.» |
| 2 | Jhordi comparte su pantalla: `index.html` arriba del todo. Baja despacio con la rueda del ratón hasta «Cursos destacados». | «Trabajamos sobre el mismo proyecto de las semanas 1 a 3: esta es nuestra página de inicio. Aquí abajo agregamos una galería interactiva: un carrusel con los cinco cursos del catálogo.» |
| 3 | Se queda quieto sobre el carrusel. | «Nuestro objetivo fue diagnosticar los problemas que aparecieron al integrarlo, corregirlos y demostrar con pruebas que funciona en celular y en computadora. Le paso la palabra a Raul, que va a explicar el diagnóstico.» |
| 4 | Jhordi **deja de compartir**. | — |

### 4 Bloque 2 · Diagnóstico (0:45 – 2:00) — Cherca Lopez, Raul

**Al empezar:** Raul comparte su pantalla con el documento abierto en la **sección 3, matriz de diagnóstico**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | La matriz. Pasa el cursor por la columna «Síntoma», de A a E. | «Soy **Raul Cherca Lopez**. Antes de tocar el código llenamos esta matriz. Primero integramos un borrador rápido del carrusel, y aparecieron los cinco síntomas del caso. Les muestro las evidencias.» |
| 2 | Abre `01-antes-A-scroll-horizontal-375.png`, de la carpeta `evidencias-plan-b`. | «**Síntoma A.** En un celular de 375 píxeles, la página medía **600 píxeles de ancho**: aparecía scroll horizontal y el texto se cortaba. Encontramos la causa con un script en la consola que lista los elementos que se salen de la pantalla: era la diapositiva, que tenía un ancho mínimo pensado para escritorio.» |
| 3 | Pasa a `02-antes-B-E-siguiente-no-cambia.png` (flecha → del visor de fotos). Señala con el cursor la franja roja de arriba. | «**Síntomas B y E.** Después de dos clics en Siguiente, el contador decía «Curso 3 de 5», pero se seguía viendo el curso 1. El texto cambiaba y la tarjeta activa no.» |
| 4 | Pasa a `03-antes-C-anterior-estado-invalido.png`. Señala «Curso 0 de 5» y el mensaje de error. | «**Síntoma C.** Anterior, desde la primera posición, mostraba «**Curso 0 de 5**» y lanzaba un error en la consola: `Cannot read properties of undefined`. El índice llegaba a menos uno.» |
| 5 | Pasa a `04-antes-D-layout-escritorio-en-caja-pequena.png`. Señala la columna de texto estrecha. | «**Síntoma D.** Con la ventana a 1000 píxeles, el contenido principal medía solo **592**, porque a la derecha está la columna lateral. Pero el CSS miraba el ancho de la ventana y aplicaba la distribución de escritorio, así que el texto quedaba apretado en 206 píxeles.» |
| 6 | Vuelve al documento, a la frase «Prioridad» debajo de la matriz. | «Priorizamos así: primero C, porque rompía el script; después B y E, que tenían la misma causa; luego A, porque impedía usar el celular; y al final D. Ahora Yvette explica cómo quedó el HTML.» |
| 7 | Raul **deja de compartir**. | — |

### 5 Bloque 3 · Decisión HTML (2:00 – 2:40) — Malpartida Sanchez, Yvette

**Al empezar:** Yvette comparte VS Code con `index.html` en la **línea 141**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Selecciona con el ratón la línea 141 (`<section id="destacados"…>`) y la 142 (`<h2>`). | «Soy **Yvette Malpartida Sanchez**. El carrusel es una sección nueva de la página de inicio: una etiqueta `section` con su título `h2`. Así se mantiene la estructura semántica: un solo `h1` en la página y cada sección con su título.» |
| 2 | Baja a la **línea 150** y selecciona el `<article class="diapositiva" … aria-label="1 de 5">`. | «Cada curso es un `article` con su propio título `h3`. El atributo `aria-label` dice «1 de 5», para que el lector de pantalla sepa en qué diapositiva está.» |
| 3 | Baja a la **línea 216** (controles) y señala los dos `<button>`. | «Los controles son botones reales, no `div`. Por eso funcionan con Enter y Espacio sin programar nada extra.» |
| 4 | Señala la **línea 220**: `aria-live="polite"`. | «El contador tiene `aria-live`: cada vez que cambia el curso, el lector de pantalla lo anuncia.» |
| 5 | Señala `solo-con-js` en la línea 216. | «Y si JavaScript no carga, los controles no aparecen y los cinco cursos se muestran como una lista normal: la página nunca queda rota. Le paso a Jorge Luis.» |
| 6 | Yvette **deja de compartir**. | — |

### 6 Bloque 4 · Decisión responsive (2:40 – 3:25) — Patiño Ramos, Jorge Luis

**Al empezar:** Jorge Luis comparte VS Code con `css/estilos.css` en la **línea 1148**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | El comentario de la línea 1148. Pasa el cursor por las líneas que dicen «Flexbox», «Grid» y «Container Queries». | «Soy **Jorge Luis Patiño Ramos**. Dejamos escrito aquí cómo repartimos el trabajo: Flexbox pone las cinco diapositivas en fila, Grid ordena la imagen, el texto y los controles, y las Container Queries deciden la distribución.» |
| 2 | Va a la **línea 1262** (`.con-js .diapositiva`) y selecciona `flex: 0 0 100%` y `min-width: 0`. | «Para el **síntoma A** quitamos el ancho mínimo de escritorio. Ahora cada diapositiva mide exactamente el cien por ciento del carrusel, y `min-width: 0` evita que un contenido largo la estire.» |
| 3 | Sube a la **línea 1248** (`.con-js .carrusel__ventana`) y señala `overflow: clip`. | «Las diapositivas ocultas quedan a la derecha, y esta ventana las recorta con `overflow: clip`. Por eso ya no hay scroll horizontal.» |
| 4 | Va a la **línea 1182** (`.carrusel { container: … }`) y luego a la **1364** (`@container carrusel (min-width: 38rem)`). | «Para el **síntoma D** convertimos el carrusel en un contenedor. Esta regla dice: cuando el **carrusel** mida al menos 38rem, pon la imagen y el texto lado a lado. Ya no importa el ancho de la ventana, sino el espacio real que tiene el componente.» |
| 5 | Va a la **línea 1379** (`.experiencias { container: … }`). | «Hicimos lo mismo con la grilla de Experiencias: ahora pasa a tres columnas cuando la sección tiene espacio para ellas. Luego lo muestro funcionando. José Antonio sigue con el JavaScript.» |
| 6 | Jorge Luis **deja de compartir**. | — |

### 7 Bloque 5 · Decisión JavaScript (3:25 – 4:10) — Tesen Tantachuco, José Antonio

**Al empezar:** José Antonio comparte VS Code con `js/interaccion.js` en la **línea 397**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Selecciona la **línea 413**: `let actual = 0;`. | «Soy **José Antonio Tesen Tantachuco**. Todo el carrusel depende de **un solo dato de estado**: este número, `actual`, que va de 0 a 4.» |
| 2 | Selecciona las **líneas 418 a 423** (función `irA`) y señala `Math.min(Math.max(indice, 0), total - 1)`. | «Solo esta función, `irA`, puede cambiar ese número, y siempre lo acota entre 0 y 4 con `Math.min` y `Math.max`. Por eso la posición menos uno ya no existe: esa era la causa del **síntoma C**.» |
| 3 | Selecciona las **líneas 425 a 452** (función `pintar`). Señala la **434**: `classList.toggle("diapositiva--activa", activa)`. | «Después, una sola función, `pintar`, dibuja todo a partir de ese número. Con `classList.toggle` deja activa exactamente una diapositiva y se la quita a las demás. En la misma función se actualizan el punto, el contador y los botones.» |
| 4 | Señala la **línea 437**: `diapositiva.inert = !activa;`. | «Como todo sale del mismo número, el texto y la imagen ya no pueden contradecirse: eso corrigió los **síntomas B y E**. Y las diapositivas ocultas son `inert`: no se puede llegar a ellas con Tab.» |
| 5 | Señala las **líneas 450 y 451** (`aria-disabled`). | «En los extremos el botón se apaga con `aria-disabled` y no con `disabled`, porque un botón `disabled` pierde el foco y quien usa teclado se quedaría perdido. Ahora lo vemos funcionando.» |

### 8 Bloque 6 · Demo del carrusel (4:10 – 5:00) — Tesen Tantachuco, José Antonio

**Al empezar:** José Antonio sigue compartiendo; cambia al navegador (`Alt` + `Tab`) con `index.html`
y baja hasta «Cursos destacados». El carrusel debe estar en el **curso 1**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Señala el contador «Curso 1 de 5» y el botón «← Anterior» gris. | «Estamos en el curso 1 de 5. Anterior se ve apagado.» |
| 2 | Hace **dos clics en «Anterior»**. No pasa nada. | «Si igual lo pulso dos veces, no pasa nada: seguimos en 1 de 5. Antes, aquí salía «Curso 0 de 5».» |
| 3 | **Un clic en «Siguiente →»**. | «Siguiente: curso 2, React desde cero. Cambian juntos la imagen, el contador y el punto de abajo.» |
| 4 | **Tres clics más en «Siguiente»** hasta «Curso 5 de 5». Después, un clic más. | «Avanzo hasta el final: 5 de 5, Marketing digital. Ahora el apagado es Siguiente, y si lo pulso otra vez se queda en 5.» |
| 5 | Clic en el **tercer punto**. | «También puedo ir directo con los puntos: curso 3, Fundamentos de análisis de datos. Yvette va a mostrar que funciona solo con teclado.» |
| 6 | José Antonio **deja de compartir**. | — |

### 9 Bloque 7 · Demo con teclado (5:00 – 5:30) — Malpartida Sanchez, Yvette

**Al empezar:** Yvette comparte el navegador con `index.html` en «Cursos destacados», curso 1.
**No toca el ratón después del paso 1.**

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Hace clic **sobre el texto del título** «Cursos destacados» (no es un enlace; solo coloca el punto de partida). Después pulsa `Tab` tres veces: enlace «Ver en el catálogo» → «Anterior» → «Siguiente». | «Ahora solo con teclado. Con Tab paso por el enlace del curso visible, luego Anterior y luego Siguiente. Se ve el borde de foco en cada uno.» |
| 2 | Con el foco en «Siguiente», pulsa `Enter` y después `Espacio`. | «Con Enter y con Espacio avanzo: curso 2, curso 3.» |
| 3 | Pulsa `Fin` (`End`) y después `Inicio` (`Home`). | «Con Fin voy al último curso y con Inicio vuelvo al primero.» |
| 4 | Pulsa `→` dos veces. | «Con las flechas me muevo de uno en uno. Y aunque llegue a un extremo, el foco se queda en el botón: no se pierde. Jorge Luis muestra el responsive.» |
| 5 | Yvette **deja de compartir**. | — |

### 10 Bloque 8 · Demo responsive (5:30 – 6:05) — Patiño Ramos, Jorge Luis

**Al empezar:** Jorge Luis comparte el navegador con `index.html` en «Cursos destacados». Abre
DevTools con `F12` y activa el modo dispositivo con `Ctrl` + `Shift` + `M`. Arriba, en «Dimensions»,
elige **Responsive**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Escribe **375** en el ancho (el alto puede ser 800). Baja por el carrusel. Pulsa «Siguiente» una vez. | «A 375 píxeles, el tamaño de un celular: la diapositiva está apilada, los botones pasan a una fila propia y **no hay scroll horizontal**, ni siquiera después de navegar.» |
| 2 | Cambia el ancho a **1000**. | «Ahora 1000 píxeles. Aunque la pantalla es ancha, el carrusel se queda apilado, porque su espacio real es de 592 píxeles: al lado está la columna lateral. Eso es la Container Query.» |
| 3 | Cambia el ancho a **1440**. | «En 1440 el carrusel tiene espacio, así que la imagen y el texto van lado a lado.» |
| 4 | Cambia el ancho a **900** y sube a «Experiencias interactivas». | «Y a 900 píxeles, la grilla de Experiencias muestra las tres tarjetas en una fila. Antes, la tercera quedaba sola abajo.» |
| 5 | Cierra el modo dispositivo (`Ctrl` + `Shift` + `M`), cierra DevTools (`F12`), sube al encabezado, clic en **«Modo oscuro»** y baja al carrusel. | «Y en modo oscuro funciona igual, sin reglas nuevas, porque usa los colores del sistema de diseño. Raul cierra con las pruebas.» |
| 6 | Vuelve a modo claro y **deja de compartir**. | — |

### 11 Bloque 9 · Consola y pruebas (6:05 – 6:20) — Cherca Lopez, Raul

**Al empezar:** Raul comparte el navegador con DevTools abierto en la pestaña **Consola**.

| # | En pantalla | Qué dice |
|-|-------|---------|
| 1 | Pulsa `Ctrl` + `Shift` + `R` (recarga completa). Hace 3 clics en «Siguiente» y 1 en el punto 1. La consola sigue vacía. | «Recargo la página y navego el carrusel: la consola está en **cero errores**.» |
| 2 | Cambia al documento, **sección 5, tabla de pruebas**. | «Registramos seis pruebas obligatorias y nueve adicionales, y revisamos 48 combinaciones de página, ancho y tema sin scroll horizontal. Todas pasaron. Ahora cada uno cuenta su aporte.» |
| 3 | Raul **deja de compartir**. | — |

### 12 Bloque 10 · Cierre (6:20 – 7:20) — los cinco

**Al empezar:** nadie comparte pantalla; se ven las cámaras. Hablan en este orden, unos 12 segundos cada uno.

| # | Integrante | Qué dice |
|-|----|-----------|
| 1 | Chauca Machuca, Jhordi Fabian | «Yo coordiné la matriz y la integración en la página de inicio. La decisión que defiendo es la prioridad: corregir primero el estado inválido, porque rompía el script, y luego B y E, que tenían la misma causa.» |
| 2 | Tesen Tantachuco, José Antonio | «Yo programé el carrusel. Defiendo usar un solo número de estado y una sola función que pinta: así la vista nunca contradice al contador.» |
| 3 | Patiño Ramos, Jorge Luis | «Yo hice el responsive. Defiendo la Container Query: el espacio real del carrusel no es el ancho de la pantalla.» |
| 4 | Malpartida Sanchez, Yvette | «Yo trabajé el HTML y la accesibilidad. Defiendo `aria-disabled` en lugar de `disabled`, para que el foco no se pierda en los extremos.» |
| 5 | Cherca Lopez, Raul | «Yo hice las pruebas y las evidencias. Defiendo medir el ancho del documento en vez de solo mirar si se ve bien: así encontramos los 600 píxeles del primer borrador.» |
| 6 | Chauca Machuca, Jhordi Fabian | «Ese fue el trabajo de nuestro equipo. Gracias.» |

### 13 Si algo falla durante la grabación

| Problema | Qué hacer |
|---|---|
| Live Server no abre | Doble clic en `index.html`: funciona igual. |
| El carrusel no está en el curso 1 al empezar | `F5` para recargar la página. |
| Alguien se traba o se pasa de tiempo | Seguir; al editar se corta. Lo importante es que **los cinco** aparezcan con cámara y nombre. |
| En VS Code no se ve la línea | `Ctrl` + `G`, escribir el número de línea y `Enter`. |
| La consola muestra un error de una extensión del navegador | Grabar esa parte en una ventana de incógnito (`Ctrl` + `Shift` + `N`), donde las extensiones no se cargan. |

### 14 Revisión antes de entregar el video

- [ ] Dura entre 6 y 8 minutos.
- [ ] Los cinco aparecen **con cámara** y su **nombre completo visible** mientras hablan.
- [ ] Se ven el diagnóstico, las decisiones (HTML, CSS y JavaScript), el carrusel en la primera y la última
      posición, el celular y la computadora, y la consola en cero.
- [ ] Cada integrante dijo su aporte y una decisión técnica.
