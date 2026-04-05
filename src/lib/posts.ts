import { db } from "@/lib/db";
import { articles, authors } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export type PostMeta = {
	title: string;
	date: string;
	name: string;
	avatar: string;
	claps: number;
	slug: string;
	description?: string;
	content_mdx?: string;
};

export const getAllPostsMeta = cache(async (): Promise<PostMeta[]> => {
	const rows = await db
		.select({
			slug: articles.slug,
			title: articles.title,
			date: articles.date,
			claps: articles.claps,
			description: articles.description,
			name: authors.name,
			avatar: authors.avatar,
		})
		.from(articles)
		.innerJoin(authors, eq(articles.author_id, authors.id))
		.where(eq(articles.status, "published"))
		.orderBy(articles.date);

	return rows
		.map((r) => ({
			...r,
			claps: r.claps ?? 0,
			description: r.description ?? undefined,
		}))
		.sort((a, b) => (a.date > b.date ? -1 : 1));
});

export const getPostBySlug = cache(
	async (slug: string): Promise<PostMeta | null> => {
		const rows = await db
			.select({
				slug: articles.slug,
				title: articles.title,
				date: articles.date,
				claps: articles.claps,
				description: articles.description,
				content_mdx: articles.content_mdx,
				name: authors.name,
				avatar: authors.avatar,
			})
			.from(articles)
			.innerJoin(authors, eq(articles.author_id, authors.id))
			.where(eq(articles.slug, slug))
			.limit(1);

		const row = rows[0];
		if (!row) return null;

		return {
			...row,
			claps: row.claps ?? 0,
			description: row.description ?? undefined,
		};
	},
);
