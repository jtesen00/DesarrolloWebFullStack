import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./estilos.css";
import App from "./App.jsx";

/* Única instancia de QueryClient de la aplicación (semana 11). Guarda la
   caché de las consultas remotas; se crea fuera de cualquier componente para
   que un render no la reemplace y pierda lo ya descargado.
   · staleTime 60 s: durante un minuto los datos se consideran frescos y se
     reutilizan sin pedirlos otra vez a la API.
   · gcTime 5 min: una página que nadie mira se borra de la memoria pasado ese
     tiempo. La caché vive en memoria: al recargar la pestaña se pierde.
   · retry 1: un fallo de red se reintenta una vez antes de mostrar el error. */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
    },
  },
});

/* Punto de entrada de React en el navegador con verificación estricta de efectos y renderizado.
   Las Devtools de TanStack Query solo se incluyen en desarrollo. */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />}
    </QueryClientProvider>
  </StrictMode>
);
