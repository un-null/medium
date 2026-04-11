"use server";

import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { articles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { revalidatePath, updateTag } from "next/cache";

async function getAuthorId(): Promise<string> {
	const cookieStore = await cookies();
	const token = cookieStore.get("editor_session")?.value;
	const authorId = token ? await verifyToken(token) : null;
	if (!authorId) throw new Error("Unauthorized");
	return authorId;
}

function generateId(): string {
	return Math.random().toString(36).slice(2, 10);
}

export async function createArticle(data: {
	slug: string;
	title: string;
	date: string;
	description?: string;
	content_mdx: string;
	content_json?: string;
}): Promise<{ id: string; slug: string }> {
	const authorId = await getAuthorId();
	const id = generateId();

	await db.insert(articles).values({
		id,
		slug: data.slug,
		title: data.title,
		date: data.date,
		author_id: authorId,
		description: data.description ?? null,
		content_mdx: data.content_mdx,
		content_json: data.content_json ?? null,
		status: "draft",
		claps: 0,
	});

	// 修正: updateTag に変更
	updateTag("articles");
	return { id, slug: data.slug };
}

export async function saveArticle(data: {
	id: string;
	title: string;
	date: string;
	slug: string;
	description?: string;
	content_mdx: string;
	content_json?: string;
	status: "draft" | "published";
}): Promise<void> {
	await getAuthorId();

	await db
		.update(articles)
		.set({
			title: data.title,
			date: data.date,
			slug: data.slug,
			description: data.description ?? null,
			content_mdx: data.content_mdx,
			content_json: data.content_json ?? null,
			status: data.status,
			updated_at: new Date(),
		})
		.where(eq(articles.id, data.id));

	updateTag("articles");
	revalidatePath(`/article/${data.slug}`);
	revalidatePath("/article");
}

export async function deleteArticle(id: string): Promise<void> {
	await getAuthorId();

	await db.delete(articles).where(eq(articles.id, id));

	updateTag("articles");
	revalidatePath("/article");
}
