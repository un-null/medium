import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

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

export const getHome = async () => {
	const page = process.env.NOTION_HOME_PAGE_ID;

	const results = (await notion.blocks.children.list({ block_id: page }))
		.results;

	return results.filter((d) => "type" in d) as BlockObjectResponse[];
};

export const getArticles = async () => {
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

export const getArticleById = async (id: string) => {
	const db = process.env.NOTION_ARTICLE_DATABASE_ID;

	const { results } = await notion.databases.query({
		database_id: db,
		filter: {
			property: "ステータス",
			select: { equals: "公開済" },
		},
		sorts: [{ property: "公開日", direction: "descending" }],
	});

	const article = results.find((item) => item.id === id);

	if (article && "properties" in article) {
		const title =
			article.properties["タイトル"]?.type === "title"
				? article.properties["タイトル"].title.map((t) => t.plain_text)
				: [""];

		const claps =
			article.properties["Claps"].type === "number" &&
			typeof article.properties["Claps"].number === "number"
				? article.properties["Claps"].number
				: 0;

		const editor = article.properties["編纂員"];

		const user =
			editor?.type === "created_by" && "name" in editor.created_by
				? {
						name: editor.created_by.name || "",
						avatar: editor.created_by.avatar_url || "",
					}
				: { name: "", avatar: "" };

		return {
			id: article.id,
			title,
			claps,
			...user,
		};
	}
};

export const getPageById = async (id: string) => {
	const results = (
		await notion.blocks.children.list({
			block_id: id,
		})
	).results;

	return results.filter((d) => "type" in d) as BlockObjectResponse[];
};

export const convBgColor = (color: NotionColor | string) => {
	switch (color) {
		case "purple_background":
			return "bg-notion-callout-purple";
		default:
			return "bg-notion-callout-default";
	}
};
