declare namespace NodeJS {
	interface ProcessEnv {
		readonly R2_ACCOUNT_ID: string;
		readonly R2_ACCESS_KEY_ID: string;
		readonly R2_SECRET_ACCESS_KEY: string;
		readonly R2_BUCKET_NAME: string;
		readonly R2_PUBLIC_URL: string;

		readonly TURSO_DATABASE_URL: string;
		readonly TURSO_AUTH_TOKEN: string;
		readonly EDITOR_SECRET: string;
		readonly NEXT_PUBLIC_SITE_URL: string;

		readonly NOTION_KEY: string;
		readonly NOTION_HOME_PAGE_ID: string;
		readonly NOTION_WORK_DATABASE_ID: string;
	}
}
