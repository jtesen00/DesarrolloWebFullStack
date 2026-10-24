import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./componentes/Layout.jsx";
import Inicio from "./paginas/Inicio.jsx";
import ExploradorCursos from "./paginas/ExploradorCursos.jsx";
import ClaseMuestra from "./paginas/ClaseMuestra.jsx";
import AsesorVirtual from "./paginas/AsesorVirtual.jsx";
import NoEncontrada from "./paginas/NoEncontrada.jsx";

/* Enrutador principal de la aplicación: estructura las cuatro rutas bajo
   el Layout común y muestra una página 404 para cualquier ruta desconocida. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="explorador-cursos" element={<ExploradorCursos />} />
          <Route path="clase-muestra" element={<ClaseMuestra />} />
          <Route path="asesor-virtual" element={<AsesorVirtual />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
