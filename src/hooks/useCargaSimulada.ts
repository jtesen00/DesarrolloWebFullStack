import { useEffect, useState } from "react";

interface EstadoCarga<T> {
  cargando: boolean;
  datos: T[];
}

/* Simula la llegada de datos desde un servidor: durante «demora» ms el
   componente muestra su estado de carga y después recibe los datos.
   Es genérico: devuelve el mismo tipo de elemento que recibe.
   Cuando exista una API real, solo cambia el cuerpo del efecto. */
export function useCargaSimulada<T>(datos: T[], demora = 1200): EstadoCarga<T> {
  const [estado, setEstado] = useState<EstadoCarga<T>>({ cargando: true, datos: [] });

  useEffect(() => {
    setEstado({ cargando: true, datos: [] });
    const temporizador = setTimeout(() => {
      setEstado({ cargando: false, datos });
    }, demora);

    // Limpieza: si el usuario sale de la página antes de que termine la
    // espera, el temporizador se cancela y no actualiza un componente
    // que ya no existe.
    return () => clearTimeout(temporizador);
  }, [datos, demora]);

  return estado;
}
