declare namespace NodeJS {
	interface ProcessEnv {
		readonly NOTION_KEY: string;
		readonly NOTION_ARTICLE_DATABASE_ID: string;
	}
}
