import { Client } from "@notionhq/client";

type NotionColor =
	| "default"
	| "gray"
	| "brown"
	| "orange"
	| "yellow"
	| "green"
	| "blue"
	| "purple"
	| "pink"
	| "red"
	| "gray_background"
	| "brown_background"
	| "orange_background"
	| "yellow_background"
	| "green_background"
	| "blue_background"
	| "purple_background"
	| "pink_background"
	| "red_background";

type FilterdArticlesData = {
	id: string;
	title: string[];
	name: string;
	avatar: string;
}[];

type FilterdWorksData = FilterdArticlesData;

type FilterdVlogData = {
	id: string;
	title: string[];
	name: string;
	avatar: string;
	url: string;
}[];

export const notion = new Client({
	auth: process.env.NOTION_KEY,
});

export const getLatestArticles = async () => {
	const db = process.env.NOTION_ARTICLE_DATABASE_ID;

	const results = (
		await notion.databases.query({
			database_id: db,
			filter: {
				property: "ステータス",
				select: {
					equals: "公開済",
				},
			},
			page_size: 3,
			sorts: [{ property: "公開日", direction: "descending" }],
		})
	).results;

	// Fix using reduce ???
	const filterdArticleData: FilterdArticlesData = [];

	results.map((d) => {
		if ("properties" in d) {
			const id = d.id;
			const title =
				d.properties["タイトル"]?.type === "title"
					? d.properties["タイトル"].title.map((t) => t.plain_text)
					: [""];
			if (
				d.properties["編纂員"]?.type === "created_by" &&
				"name" in d.properties["編纂員"].created_by
			) {
				const user = {
					name: d.properties["編纂員"].created_by.name || "",
					avatar: d.properties["編纂員"].created_by.avatar_url || "",
				};
				filterdArticleData.push({ id, title, ...user });
			}
		}
		return [];
	});

	return filterdArticleData;
};
