/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_KEY: string;
  readonly NOTION_ARTICLE_DATABASE_ID: string;
  readonly NOTION_WORK_DATABASE_ID: string;
  readonly NOTION_VLOG_DATABASE_ID: string;
  readonly NOTION_HOME_PAGE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
