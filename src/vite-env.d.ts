/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
  // другие переменные...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}