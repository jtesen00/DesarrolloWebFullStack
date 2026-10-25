import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./estilos.css";
import App from "./App.jsx";

/* Punto de entrada de React en el navegador con verificación estricta de efectos y renderizado. */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
