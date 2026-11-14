/* Servidor WebSocket propio de Wayra Academy (semana 10).
   Acepta conexiones, recibe mensajes JSON, administra salas sencillas y
   distribuye notificaciones solo a los clientes de la misma sala.

   Es una implementación didáctica para ejecutar en local: no autentica a nadie
   y confía en el nombre de sala que envía el navegador. Las limitaciones están
   en docs/SEMANA-10-WEBSOCKET.md. */

const WebSocket = require("ws");

const PUERTO_POR_DEFECTO = 3001;
const SALA_GENERAL = "general";
const TAMANO_MAXIMO = 16 * 1024; // bytes por mensaje: nada del contrato se acerca
const LATIDO_MS = 30_000;

/* Contrato compartido con el frontend (src/types/notification.ts). */
const TIPOS_VALIDOS = ["NEW_EXPERIENCE", "SCHEDULE_CHANGE", "REMINDER"];
const LIMITES = { id: 100, title: 120, message: 500, room: 60 };

function textoValido(valor, maximo) {
  return typeof valor === "string" && valor.trim() !== "" && valor.length <= maximo;
}

/* Devuelve la notificación limpia (solo los campos del contrato) o un texto
   con el motivo del rechazo. Nunca se reenvía el objeto tal como llegó. */
function validarNotificacion(p) {
  if (!p || typeof p !== "object" || Array.isArray(p)) return { error: "Payload de notificación incompleto" };
  const faltantes = ["id", "title", "message", "createdAt", "type"].filter((campo) => !p[campo]);
  if (faltantes.length > 0) return { error: `Payload de notificación incompleto: falta ${faltantes.join(", ")}` };
  if (!textoValido(p.id, LIMITES.id)) return { error: "El id debe ser texto de hasta 100 caracteres" };
  if (!textoValido(p.title, LIMITES.title)) return { error: "El título debe ser texto de hasta 120 caracteres" };
  if (!textoValido(p.message, LIMITES.message)) return { error: "El mensaje debe ser texto de hasta 500 caracteres" };
  if (typeof p.createdAt !== "string" || Number.isNaN(Date.parse(p.createdAt))) {
    return { error: "createdAt debe ser una fecha ISO 8601" };
  }
  if (!TIPOS_VALIDOS.includes(p.type)) return { error: `type debe ser uno de: ${TIPOS_VALIDOS.join(", ")}` };

  return {
    notificacion: {
      id: p.id.trim(),
      title: p.title.trim(),
      message: p.message.trim(),
      createdAt: new Date(p.createdAt).toISOString(),
      type: p.type,
    },
  };
}

function crearServidor({ port = PUERTO_POR_DEFECTO, registrar = console } = {}) {
  const wss = new WebSocket.Server({ port, maxPayload: TAMANO_MAXIMO });

  // Mapa: nombre de sala -> conjunto de conexiones
  const rooms = new Map();

  function send(ws, data) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  function sendError(ws, message) {
    send(ws, { event: "server:error", payload: { message } });
  }

  /* Cada conexión está en una sola sala. Al cambiar, sale de la anterior:
     si no, seguiría recibiendo los eventos de las dos. */
  function leaveRoom(ws) {
    const anterior = ws.roomName;
    if (!anterior || !rooms.has(anterior)) return;
    const members = rooms.get(anterior);
    members.delete(ws);
    ws.roomName = undefined;
    if (members.size === 0) rooms.delete(anterior);
    else announceMembers(anterior);
  }

  /* Avisa a toda la sala cuántos clientes tiene ahora (para la prueba
     multiusuario: cada ventana ve cuándo entra o sale la otra). */
  function announceMembers(roomName) {
    const members = rooms.get(roomName);
    if (!members) return;
    broadcastToRoom(roomName, { event: "room:members", payload: { room: roomName, members: members.size } });
  }

  function joinRoom(ws, roomName) {
    leaveRoom(ws);
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Set());
    }
    rooms.get(roomName).add(ws);
    ws.roomName = roomName;

    send(ws, {
      event: "room:joined",
      payload: { room: roomName, members: rooms.get(roomName).size },
    });
    announceMembers(roomName);
  }

  function broadcastToRoom(roomName, message) {
    const members = rooms.get(roomName);
    if (!members) return 0;

    for (const client of members) {
      send(client, message);
    }
    return members.size;
  }

  wss.on("connection", (ws) => {
    ws.isAlive = true;
    ws.on("pong", () => { ws.isAlive = true; });

    // Mientras no elija otra, la conexión pertenece a la sala general.
    if (!rooms.has(SALA_GENERAL)) rooms.set(SALA_GENERAL, new Set());
    rooms.get(SALA_GENERAL).add(ws);
    ws.roomName = SALA_GENERAL;

    registrar.log(`Cliente conectado (${wss.clients.size} en total)`);

    send(ws, {
      event: "server:ready",
      payload: { message: "Conexión establecida", room: SALA_GENERAL },
    });

    ws.on("message", (rawMessage, isBinary) => {
      if (isBinary) {
        sendError(ws, "El mensaje debe ser JSON válido");
        return;
      }

      let data;
      try {
        data = JSON.parse(rawMessage.toString());
      } catch {
        sendError(ws, "El mensaje debe ser JSON válido");
        return;
      }

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        sendError(ws, "El mensaje debe ser un objeto JSON con una acción");
        return;
      }

      if (data.action === "join-room") {
        if (typeof data.room !== "string" || !data.room.trim() || data.room.trim().length > LIMITES.room) {
          sendError(ws, "Nombre de sala inválido");
          return;
        }
        const sala = data.room.trim();
        joinRoom(ws, sala);
        registrar.log(`Cliente unido a la sala «${sala}»`);
        return;
      }

      if (data.action === "publish-notification") {
        const { notificacion, error } = validarNotificacion(data.payload);
        if (error) {
          sendError(ws, error);
          return;
        }

        const roomName = ws.roomName || SALA_GENERAL;
        const destinatarios = broadcastToRoom(roomName, {
          event: "notification:new",
          payload: notificacion,
        });
        registrar.log(`Notificación ${notificacion.type} enviada a «${roomName}» (${destinatarios} cliente/s)`);
        return;
      }

      sendError(ws, "Acción no reconocida");
    });

    ws.on("close", () => {
      leaveRoom(ws);
      registrar.log(`Cliente desconectado (${wss.clients.size} en total)`);
    });

    ws.on("error", (error) => {
      registrar.error("Error de conexión:", error.message);
    });
  });

  /* Latido: una conexión que no responde al ping (wifi caído, portátil
     suspendido) no avisa al cerrarse. Se descarta para no dejarla en su sala. */
  const latido = setInterval(() => {
    for (const ws of wss.clients) {
      if (!ws.isAlive) {
        ws.terminate();
        continue;
      }
      ws.isAlive = false;
      ws.ping();
    }
  }, LATIDO_MS);
  latido.unref();

  /* Cierre controlado: cada cliente recibe el código 1001 («se va») en lugar
     de ver la conexión cortada sin aviso. */
  function cerrar() {
    clearInterval(latido);
    for (const ws of wss.clients) ws.close(1001, "Servidor detenido");
    return new Promise((resolver) => wss.close(() => resolver()));
  }

  return { wss, rooms, cerrar };
}

module.exports = { crearServidor, validarNotificacion, TIPOS_VALIDOS };

/* Solo arranca al ejecutar «node server.js» (npm start), no al importarlo
   desde las pruebas. */
if (require.main === module) {
  const PORT = Number(process.env.PORT) || PUERTO_POR_DEFECTO;
  const { wss, cerrar } = crearServidor({ port: PORT });

  wss.on("listening", () => {
    console.log(`Servidor WebSocket escuchando en ws://localhost:${PORT}`);
  });

  wss.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`El puerto ${PORT} está ocupado. Usa otro (PORT=3002 npm start) y el mismo número en VITE_WS_URL.`);
    } else {
      console.error("Error del servidor:", error.message);
    }
    process.exit(1);
  });

  for (const senal of ["SIGINT", "SIGTERM"]) {
    process.on(senal, () => {
      console.log("\nCerrando el servidor y sus conexiones…");
      cerrar().then(() => process.exit(0));
    });
  }
}
