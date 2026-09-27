/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string;
  readonly VITE_MAIL_URL?: string;
  readonly VITE_PAGES_PREVIEW?: string;
  readonly VITE_FORM_DEMO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
