/* Pruebas de aceptación del servidor (sección 10 de la guía) sin navegador.
   Levanta el servidor en un puerto libre, conecta clientes con ws y comprueba
   salas, validación y desconexión. Uso: npm test (desde server/). */

const assert = require("node:assert/strict");
const WebSocket = require("ws");
const { crearServidor } = require("./server.js");

const silencioso = { log() {}, error() {} };
const ESPERA_MS = 300;

function notificacion(extra = {}) {
  return {
    id: `prueba-${Math.random().toString(36).slice(2)}`,
    title: "Nueva experiencia",
    message: "Se publicó una nueva actividad en el catálogo.",
    createdAt: new Date().toISOString(),
    type: "NEW_EXPERIENCE",
    ...extra,
  };
}

/* Cliente de prueba que guarda todo lo que recibe. */
function conectar(port) {
  return new Promise((resolver, rechazar) => {
    const ws = new WebSocket(`ws://localhost:${port}`);
    ws.recibidos = [];
    ws.on("message", (dato) => ws.recibidos.push(JSON.parse(dato.toString())));
    ws.once("open", () => resolver(ws));
    ws.once("error", rechazar);
  });
}

function esperarEvento(ws, evento) {
  return new Promise((resolver, rechazar) => {
    const ya = ws.recibidos.find((m) => m.event === evento);
    if (ya) return resolver(ya);
    const limite = setTimeout(() => rechazar(new Error(`No llegó ${evento}`)), 2000);
    ws.on("message", function revisar(dato) {
      const mensaje = JSON.parse(dato.toString());
      if (mensaje.event === evento) {
        clearTimeout(limite);
        ws.off("message", revisar);
        resolver(mensaje);
      }
    });
  });
}

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
const eventos = (ws, nombre) => ws.recibidos.filter((m) => m.event === nombre);

async function unirse(ws, room) {
  ws.recibidos.length = 0;
  ws.send(JSON.stringify({ action: "join-room", room }));
  return esperarEvento(ws, "room:joined");
}

async function main() {
  const { wss, cerrar } = crearServidor({ port: 0, registrar: silencioso });
  await new Promise((r) => wss.once("listening", r));
  const { port } = wss.address();

  const resultados = [];
  async function prueba(nombre, fn) {
    try {
      await fn();
      resultados.push({ nombre, ok: true });
      console.log(`  ✔ ${nombre}`);
    } catch (error) {
      resultados.push({ nombre, ok: false, error: error.message });
      console.log(`  ✘ ${nombre}\n      ${error.message}`);
    }
  }

  console.log(`Servidor de prueba en ws://localhost:${port}\n`);

  const a = await conectar(port);
  const b = await conectar(port);

  await prueba("Conexión: el servidor envía server:ready", async () => {
    const listo = await esperarEvento(a, "server:ready");
    assert.equal(listo.payload.message, "Conexión establecida");
  });

  await prueba("Unión a sala: join-room responde room:joined con el nombre", async () => {
    const r1 = await unirse(a, "experiencias");
    const r2 = await unirse(b, "  experiencias  ");
    assert.equal(r1.payload.room, "experiencias");
    assert.equal(r2.payload.room, "experiencias");
    assert.equal(r2.payload.members, 2);
  });

  await prueba("Unión a sala: la sala recibe room:members con el total actualizado", async () => {
    const c = await conectar(port);
    a.recibidos.length = 0;
    await unirse(c, "experiencias");
    await pausa(ESPERA_MS);
    assert.equal(eventos(a, "room:members").at(-1)?.payload.members, 3);
    a.recibidos.length = 0;
    c.close();
    await pausa(ESPERA_MS);
    assert.equal(eventos(a, "room:members").at(-1)?.payload.members, 2);
  });

  await prueba("Evento válido: los dos clientes de la sala reciben notification:new", async () => {
    const enviada = notificacion();
    a.recibidos.length = 0;
    b.recibidos.length = 0;
    a.send(JSON.stringify({ action: "publish-notification", payload: enviada }));
    const [ra, rb] = await Promise.all([esperarEvento(a, "notification:new"), esperarEvento(b, "notification:new")]);
    assert.deepEqual(ra.payload, enviada);
    assert.deepEqual(rb.payload, enviada);
  });

  await prueba("Evento válido: solo se reenvían los campos del contrato", async () => {
    a.recibidos.length = 0;
    a.send(JSON.stringify({ action: "publish-notification", payload: notificacion({ extra: "<script>" }) }));
    const r = await esperarEvento(a, "notification:new");
    assert.deepEqual(Object.keys(r.payload).sort(), ["createdAt", "id", "message", "title", "type"]);
  });

  await prueba("Payload inválido: JSON mal formado devuelve server:error", async () => {
    a.recibidos.length = 0;
    a.send("{esto no es json");
    const r = await esperarEvento(a, "server:error");
    assert.equal(r.payload.message, "El mensaje debe ser JSON válido");
  });

  await prueba("Payload inválido: campos incompletos se rechazan y no se distribuyen", async () => {
    a.recibidos.length = 0;
    b.recibidos.length = 0;
    a.send(JSON.stringify({ action: "publish-notification", payload: { id: "x", title: "Sin mensaje" } }));
    const r = await esperarEvento(a, "server:error");
    assert.match(r.payload.message, /incompleto/);
    await pausa(ESPERA_MS);
    assert.equal(eventos(b, "notification:new").length, 0);
  });

  await prueba("Payload inválido: tipo fuera del contrato se rechaza", async () => {
    a.recibidos.length = 0;
    a.send(JSON.stringify({ action: "publish-notification", payload: notificacion({ type: "OTRO" }) }));
    const r = await esperarEvento(a, "server:error");
    assert.match(r.payload.message, /type debe ser/);
  });

  await prueba("Acción desconocida y sala vacía devuelven server:error", async () => {
    a.recibidos.length = 0;
    a.send(JSON.stringify({ action: "borrar-todo" }));
    assert.equal((await esperarEvento(a, "server:error")).payload.message, "Acción no reconocida");
    a.recibidos.length = 0;
    a.send(JSON.stringify({ action: "join-room", room: "   " }));
    assert.equal((await esperarEvento(a, "server:error")).payload.message, "Nombre de sala inválido");
  });

  await prueba("Salas: cada sala recibe solo sus propios eventos", async () => {
    await unirse(a, "experiencias-equipo-a");
    await unirse(b, "experiencias-equipo-b");
    a.recibidos.length = 0;
    b.recibidos.length = 0;
    a.send(JSON.stringify({ action: "publish-notification", payload: notificacion({ title: "Para A" }) }));
    b.send(JSON.stringify({ action: "publish-notification", payload: notificacion({ title: "Para B" }) }));
    await pausa(ESPERA_MS);
    assert.deepEqual(eventos(a, "notification:new").map((m) => m.payload.title), ["Para A"]);
    assert.deepEqual(eventos(b, "notification:new").map((m) => m.payload.title), ["Para B"]);
  });

  await prueba("Salas: al cambiar de sala se deja de recibir la anterior", async () => {
    const c = await conectar(port);
    await unirse(c, "experiencias-equipo-a");
    await unirse(c, "experiencias-equipo-b");
    a.recibidos.length = 0;
    c.recibidos.length = 0;
    a.send(JSON.stringify({ action: "publish-notification", payload: notificacion() }));
    await pausa(ESPERA_MS);
    assert.equal(eventos(c, "notification:new").length, 0);
    c.close();
  });

  await prueba("Desconexión: al detener el servidor el cliente recibe cierre 1001", async () => {
    const cierre = new Promise((r) => a.once("close", (codigo) => r(codigo)));
    await cerrar();
    assert.equal(await cierre, 1001);
  });

  const fallidas = resultados.filter((r) => !r.ok).length;
  console.log(`\n${resultados.length - fallidas}/${resultados.length} pruebas superadas`);
  process.exit(fallidas === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
