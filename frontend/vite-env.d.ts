// Source - https://stackoverflow.com/a
// Posted by Sayvai
// Retrieved 2026-01-29, License - CC BY-SA 4.0

/// <reference types="vite/types/importMeta.d.ts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
