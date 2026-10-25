import { useEffect } from "react";
import Boton from "../componentes/Boton.jsx";

/* Ruta desconocida: en vez de redirigir en silencio al inicio, se explica
   qué pasó y se ofrecen caminos para seguir. */
export default function NoEncontrada() {
  useEffect(() => {
    document.title = "Página no encontrada — Wayra Academy";
  }, []);

  return (
    <main id="contenido" className="contenedor no-encontrada">
      <p className="no-encontrada__codigo">Error 404</p>
      <h1 className="no-encontrada__titulo">Esta página no existe.</h1>
      <p className="no-encontrada__texto">
        Puede que el enlace esté incompleto o que la página se haya movido. Vuelve al inicio o
        explora el catálogo de cursos.
      </p>
      <div className="hero__acciones">
        <Boton to="/" flecha grande>Ir al inicio</Boton>
        <Boton to="/explorador-cursos" variante="secundario" grande>Ver los cursos</Boton>
      </div>
    </main>
  );
}
