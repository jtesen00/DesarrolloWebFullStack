/// <reference types="vite/client" />

/* Variables de entorno que lee la aplicación. Vite solo expone las que
   empiezan por VITE_; se definen en .env.local (ver .env.example). */
interface ImportMetaEnv {
  readonly VITE_WS_URL?: string;
  /* Opcional: base de la API del catálogo. Por defecto, JSONPlaceholder. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
