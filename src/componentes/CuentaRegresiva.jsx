import { useEffect, useState } from "react";

const UNIDADES = [
  { nombre: "días", ms: 86_400_000 },
  { nombre: "horas", ms: 3_600_000 },
  { nombre: "min", ms: 60_000 },
  { nombre: "seg", ms: 1_000 },
];

// Reparte los milisegundos restantes en días, horas, minutos y segundos.
function desglosar(restante) {
  let resto = restante;
  return UNIDADES.map((unidad) => {
    const valor = Math.floor(resto / unidad.ms);
    resto -= valor * unidad.ms;
    return { ...unidad, valor };
  });
}

/* Contador automático hasta el próximo inicio de clases. Se actualiza solo,
   una vez por segundo, con setInterval. */
export default function CuentaRegresiva({ inicios }) {
  const [ahora, setAhora] = useState(() => Date.now());

  const proximo = inicios.find((inicio) => new Date(inicio.fecha).getTime() > ahora);

  useEffect(() => {
    // Sin fechas futuras no hay nada que contar: no se crea el intervalo.
    if (!proximo) return;

    const intervalo = setInterval(() => setAhora(Date.now()), 1000);

    // Limpieza: al salir de la página (o al cambiar de fecha objetivo) se
    // detiene el intervalo. Sin esto seguiría corriendo para siempre.
    return () => clearInterval(intervalo);
  }, [proximo]);

  if (!proximo) {
    return <p className="cuenta__aviso">Pronto anunciaremos nuevas fechas de inicio.</p>;
  }

  const partes = desglosar(new Date(proximo.fecha).getTime() - ahora);

  return (
    <div className="cuenta">
      <p className="cuenta__curso">Próximo inicio: {proximo.curso}</p>
      {/* aria-hidden en los números: un lector de pantalla no debe leer un
          cambio por segundo. La fecha accesible va en el texto de abajo. */}
      <div className="cuenta__reloj" aria-hidden="true">
        {partes.map((parte) => (
          <span className="cuenta__parte" key={parte.nombre}>
            <span className="cuenta__valor">{String(parte.valor).padStart(2, "0")}</span>
            <span className="cuenta__unidad">{parte.nombre}</span>
          </span>
        ))}
      </div>
      <p className="cuenta__aviso">
        Empieza el <time dateTime={proximo.fecha}>{proximo.texto}</time>.
      </p>
    </div>
  );
}
