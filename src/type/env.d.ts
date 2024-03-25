interface ImportMetaEnv {
  readonly NOTION_KEY: string;
  readonly NOTION_ARTICKE_DATABASE_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
