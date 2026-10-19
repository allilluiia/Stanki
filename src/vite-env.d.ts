/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string;
  readonly VITE_MAIL_URL?: string;
  readonly VITE_PAGES_PREVIEW?: string;
  readonly VITE_FORM_DEMO?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_COMPANY_LEGAL_NAME?: string;
  readonly VITE_COMPANY_SHORT_NAME?: string;
  readonly VITE_COMPANY_PHONE?: string;
  readonly VITE_COMPANY_PHONE_HREF?: string;
  readonly VITE_COMPANY_EMAIL?: string;
  readonly VITE_COMPANY_PRIVACY_EMAIL?: string;
  readonly VITE_COMPANY_ADDRESS?: string;
  readonly VITE_COMPANY_LEGAL_ADDRESS?: string;
  readonly VITE_COMPANY_INN?: string;
  readonly VITE_COMPANY_KPP?: string;
  readonly VITE_COMPANY_OGRN?: string;
  readonly VITE_COMPANY_BANK?: string;
  readonly VITE_COMPANY_DIRECTOR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
