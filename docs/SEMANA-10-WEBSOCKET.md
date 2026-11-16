# Semana 10: servidor WebSocket propio

Wayra Academy recibe notificaciones en tiempo real desde un servidor propio
hecho con Node.js y `ws`. Cuando llega un evento, el contador de la campana, el
panel y el aviso se actualizan sin recargar la página.

```
server/server.js ──WebSocket──▶ useExperienceSocket ──valida──▶ addNotification()
                                                                     │
                     campana (contador) ◀── NotificationContext ──▶ panel + aviso (Toast)
```

## Requisitos

- Node.js LTS (probado con v24.14) y npm.
- Un navegador moderno. Para la prueba multiusuario se necesitan dos ventanas o dos navegadores.

## Instalación y ejecución

Se usan dos terminales y las dos deben quedar abiertas.

```bash
# Terminal 1: servidor WebSocket
cd server
npm install
npm start          # → Servidor WebSocket escuchando en ws://localhost:3001

# Terminal 2: frontend (desde la raíz)
npm install
cp .env.example .env.local   # contiene VITE_WS_URL=ws://localhost:3001
npm run dev
```

- **Puerto ocupado:** usa `PORT=3002 npm start` (en PowerShell: `$env:PORT=3002; npm start`) y cambia `VITE_WS_URL` al mismo número.
- **Cambios en `.env.local`:** Vite solo los lee al arrancar. Después de editar el archivo, reinicia `npm run dev`.
- **Git:** `.env.local` no se sube. `.env.example` sí se sube y sirve de plantilla.
- **Pruebas del servidor:** desde `server/`, ejecuta `npm test`. Levanta el servidor en un puerto libre y comprueba las pruebas de aceptación (ver más abajo).

## Contrato JSON

El tipo está en [`src/types/notification.ts`](../src/types/notification.ts). Los nombres de las propiedades son los de la guía. El servidor valida estos mismos campos.

```json
{
  "id": "identificador-unico",
  "title": "Nueva experiencia",
  "message": "Se publicó una nueva actividad en el catálogo.",
  "createdAt": "2026-11-07T15:00:00.000Z",
  "type": "NEW_EXPERIENCE"
}
```

| Campo | Regla (servidor y cliente) |
|---|---|
| `id` | Texto no vacío, hasta 100 caracteres |
| `title` | Texto no vacío, hasta 120 caracteres |
| `message` | Texto no vacío, hasta 500 caracteres |
| `createdAt` | Fecha ISO 8601 válida |
| `type` | `NEW_EXPERIENCE` \| `SCHEDULE_CHANGE` \| `REMINDER` |

En el navegador, el contexto guarda `AppNotification`, que es el mismo evento con `read: boolean`. El tipo no se llama `Notification` porque taparía la API `Notification` del propio navegador.

## Eventos

**Del cliente al servidor (`action`)**

| Acción | Cuerpo | Respuesta |
|---|---|---|
| `join-room` | `{ "action": "join-room", "room": "experiencias" }` | `room:joined` al cliente y `room:members` a la sala |
| `publish-notification` | `{ "action": "publish-notification", "payload": { …contrato } }` | `notification:new` a **toda la sala**, incluido quien la envió |

**Del servidor al cliente (`event`)**

| Evento | Payload | Cuándo |
|---|---|---|
| `server:ready` | `{ message, room: "general" }` | Al conectarse |
| `room:joined` | `{ room, members }` | Tras `join-room` |
| `room:members` | `{ room, members }` | Cuando alguien entra en la sala o sale de ella (añadido respecto a la guía) |
| `notification:new` | Contrato, solo con sus 5 campos | Notificación válida publicada en la sala |
| `server:error` | `{ message }` | JSON inválido, sala inválida, payload incompleto o acción desconocida |

## Qué se implementó

| Paso de la guía | Archivo | Resultado |
|---|---|---|
| 1–4. Servidor | [`server/server.js`](../server/server.js), `server/package.json` | `ws` sin Socket.IO, con salas y validación. Arranca con `npm start` |
| 6. Variable de entorno | `.env.local`, `.env.example`, [`src/vite-env.d.ts`](../src/vite-env.d.ts) | `VITE_WS_URL` tipada |
| Contexto de Desarrollo Web | [`src/context/NotificationContext.tsx`](../src/context/NotificationContext.tsx) | `NotificationProvider`, `useNotifications()` y `addNotification()` estable (`useCallback`) que deduplica por `id` |
| Adaptador de eventos | [`src/servicios/adaptadorNotificaciones.ts`](../src/servicios/adaptadorNotificaciones.ts) | Valida el `payload` (`unknown` → tipo) y lo transforma en `AppNotification` |
| 7. Hook de conexión | [`src/hooks/useExperienceSocket.ts`](../src/hooks/useExperienceSocket.ts) | Una conexión, unión a sala, validación, reconexión y limpieza |
| 8. Montaje único | [`src/componentes/LiveNotificationFeed.tsx`](../src/componentes/LiveNotificationFeed.tsx), `App.jsx` | Se monta una sola vez dentro de `NotificationProvider` |
| 9. Envío desde React | [`NotificationPanel.tsx`](../src/componentes/NotificationPanel.tsx) | Botón «Generar notificación de prueba» que usa la conexión abierta |
| 10. Actualización visual | [`CentroNotificaciones.tsx`](../src/componentes/CentroNotificaciones.tsx), `NotificationPanel.tsx`, [`NotificationToast.tsx`](../src/componentes/NotificationToast.tsx) | Contador en la campana, historial y aviso con `aria-live="polite"`. Animaciones de Motion moderadas |
| Salas | Panel → «Sala», o `?sala=nombre` en la URL | Cada pestaña recuerda su sala (`sessionStorage`) |

## Decisiones respecto a la guía

- **No existía un `NotificationContext` previo.** La guía da por hecho que Desarrollo Web ya lo había entregado, pero el repositorio no lo tenía. Se creó con la API que la guía describe y es el **único** almacén: el WebSocket no guarda notificaciones por su cuenta. El aviso tampoco: lee la más reciente del contexto y solo recuerda cuál se cerró.
- **`LiveNotificationFeed` envuelve a la aplicación.** En la guía es un hermano que devuelve `null`. Aquí recibe `children` porque el botón de prueba, que está en el panel del encabezado, necesita enviar por la **misma** conexión. Lo que comparte es el estado de la conexión y las funciones de envío; las notificaciones siguen solo en `NotificationContext`.
- **Un cliente sale de su sala anterior al unirse a otra.** En el código de la guía, `joinRoom` no lo sacaba de la sala anterior, así que al cambiar de sala seguía recibiendo los eventos de las dos.
- **Todo cliente empieza en `general`.** La guía envía a `general` a quien aún no eligió sala, pero ese cliente no estaba en el conjunto de la sala y no recibía su propio envío.
- **El servidor reenvía solo los 5 campos del contrato.** Además comprueba tipos, longitudes y que `type` y `createdAt` sean válidos. La guía solo comprobaba que los campos existieran.
- **Reconexión automática.** Si el servidor se detiene, el cliente lo dice («Sin conexión · reintentando»), desactiva el envío y reintenta con espera creciente (1 s, 2 s, 4 s… hasta 15 s). Al volver, se une otra vez a su sala.
- **Cierre controlado.** Con `Ctrl+C`, el servidor cierra cada conexión con el código 1001. Un latido (ping/pong cada 30 s) descarta las conexiones caídas que no avisaron.
- **Listeners con `AbortController`.** Al desmontar, un solo `abort()` quita los cuatro listeners y luego se cierra el socket.

## Pruebas funcionales y criterios de aceptación

Las pruebas se automatizaron de dos formas:

- `server/pruebas.js`: 12 pruebas con clientes `ws`, ejecutadas con `npm test`.
- Una prueba en navegador con dos ventanas (dos contextos de Edge con Playwright), con React y el servidor reales.

| Prueba | Procedimiento | Resultado medido | Cumple |
|---|---|---|---|
| Inicio del servidor | `npm start` en `server/` | `Servidor WebSocket escuchando en ws://localhost:3001` | Sí |
| Conexión | Iniciar Vite y abrir la app | El servidor registra `Cliente conectado`. El panel dice «En vivo» | Sí |
| Unión a sala | El cliente envía `join-room` | `room:joined` con `experiencias`. Con dos ventanas: «2 conectados» | Sí |
| Evento válido | Botón «Generar notificación de prueba» en la ventana A | A y B reciben `notification:new`. El registro dice «enviada a «experiencias» (2 cliente/s)» | Sí |
| Actualización de la UI | Recibir la notificación | La campana pasa a «Notificaciones: 1 sin leer», aparece en el panel y se ve el aviso, sin recargar | Sí |
| Payload inválido | «Enviar payload incompleto» y JSON mal formado (`npm test`) | `server:error`: «falta message, createdAt, type». En B el contador sigue en 2 | Sí |
| Salas | A en `experiencias-equipo-a`, B en `experiencias-equipo-b` | A pasa de 2 a 3 notificaciones y B se queda en 2. Después, al revés | Sí |
| Desconexión | Detener el servidor con la app abierta | «Sin conexión · reintentando» y el botón desactivado. Al reiniciar, vuelve a la misma sala y recibe | Sí |
| Limpieza | Navegar por 3 rutas y desmontar | Navegar no abre conexiones nuevas. Al desmontar, el socket se cierra (en el registro del servidor, «Cliente desconectado» del doble montaje de `StrictMode`) | Sí |
| Accesibilidad | Teclado y lector | `aria-expanded` en la campana. `Escape` cierra el panel y devuelve el foco. El contador está en el nombre del botón. Aviso en región `aria-live="polite"` | Sí |
| Responsive y tema | 375 px y tema oscuro | Sin desplazamiento horizontal. Panel y aviso legibles en los dos temas | Sí |
| Consola | Recorrido completo | 0 errores | Sí |

Evidencias en [`evidencias-semana-10/`](evidencias-semana-10/): 10 capturas, `resultados-parte1.json` (dos clientes), `resultados-parte2.json` (desconexión) y `registro-servidor.txt`.

### Cómo repetir la prueba multiusuario a mano

1. Inicia el servidor y `npm run dev`.
2. Abre `http://localhost:5173` en dos ventanas.
3. En las dos, abre la campana. Deben decir «En vivo · sala experiencias (2 conectados)».
4. En una ventana, pulsa «Generar notificación de prueba». Las dos suben el contador y muestran el aviso.
5. En la ventana A, cambia la sala a `experiencias-equipo-a`. En la B, a `experiencias-equipo-b`.
6. Envía desde cada ventana. Cada una recibe solo lo suyo.

Otra forma: abre `http://localhost:5173/?sala=experiencias-equipo-a` en una ventana y `?sala=experiencias-equipo-b` en la otra.

## Limitaciones encontradas

- **No está listo para producción.** No hay autenticación ni autorización, y el servidor confía en el nombre de sala que envía el navegador. Cualquiera que llegue al puerto puede publicar en cualquier sala. Tampoco hay límite de mensajes por minuto, y la conexión es `ws://`, no `wss://`.
- **Sin persistencia.** Las notificaciones viven en memoria y se pierden al recargar. Quien se conecta tarde no recibe lo anterior. Esto corresponde a la semana 11.
- **Aviso en la consola de desarrollo.** `StrictMode` monta el efecto dos veces y el primer socket se cierra antes de conectar. El navegador muestra «WebSocket is closed before the connection is established». En producción no ocurre.
- **Un aviso a la vez.** Si llegan dos notificaciones seguidas, la segunda reemplaza a la primera en el aviso. Las dos quedan en el panel.
- **Red local.** Para probar entre computadoras, `localhost` no sirve. Hay que usar la IP del equipo servidor en `VITE_WS_URL`, abrir el puerto en el firewall y ejecutar `npm run dev -- --host`.

## Continuidad hacia la semana 11

El contrato (`src/types/notification.ts`) y los eventos quedan documentados aquí. Al pasar a Zustand solo cambia el almacén: el hook seguirá validando con el mismo adaptador y llamará a la acción equivalente a `addNotification`.
