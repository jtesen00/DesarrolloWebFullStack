import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion } from "motion/react";
import Layout from "./componentes/Layout.jsx";
import Inicio from "./paginas/Inicio.jsx";
import ExploradorCursos from "./paginas/ExploradorCursos.tsx";
import ClaseMuestra from "./paginas/ClaseMuestra.jsx";
import AsesorVirtual from "./paginas/AsesorVirtual.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";
import CatalogoExperiencias from "./paginas/CatalogoExperiencias.tsx";
import { LiveNotificationFeed } from "./componentes/LiveNotificationFeed.tsx";
import { useSincronizacionTema } from "./servicios/sincronizacionTema.ts";

/* Las funciones de Motion llegan en un archivo aparte. Si esa carga falla, la
   clase hace visibles las tarjetas: sin ella se quedarían ocultas esperando una
   animación que nunca empieza. */
function cargarAnimaciones() {
  return import("./animaciones/caracteristicas.ts")
    .then((modulo) => modulo.default)
    .catch(() => {
      document.documentElement.classList.add("sin-animaciones");
      return {};
    });
}

/* Enrutador principal de la aplicación: estructura las cuatro rutas bajo
   el Layout común y muestra una página 404 para cualquier ruta desconocida.
   LazyMotion carga solo las animaciones y gestos que se usan, y fuera del archivo
   principal. «strict» avisa si alguien usa «motion» en lugar de «m» y anula ese
   ahorro.
   Desde la semana 11 no hay Providers de estado: tema y notificaciones viven
   en el store Zustand. LiveNotificationFeed abre una sola conexión WebSocket
   y useSincronizacionTema el canal entre pestañas; los dos se montan aquí una
   vez y no se reabren al cambiar de ruta. (QueryClientProvider está en
   main.jsx, también una sola vez.) */
export default function App() {
  useSincronizacionTema();

  return (
    <>
      <LiveNotificationFeed />
      <LazyMotion features={cargarAnimaciones} strict>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path="explorador-cursos" element={<ExploradorCursos />} />
              <Route path="experiencias" element={<CatalogoExperiencias />} />
              <Route path="clase-muestra" element={<ClaseMuestra />} />
              <Route path="asesor-virtual" element={<AsesorVirtual />} />
              <Route path="*" element={<NoEncontrada />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LazyMotion>
    </>
  );
}
