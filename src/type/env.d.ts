interface ImportMetaEnv {
  readonly NOTION_KEY: string;
  readonly NOTION_ARTICLE_DATABASE_ID: string;
  readonly NOTION_WORK_DATABASE_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
