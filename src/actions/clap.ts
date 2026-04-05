"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function clap(slug: string) {
	await db
		.update(articles)
		.set({ claps: sql`${articles.claps} + 1` })
		.where(eq(articles.slug, slug));

	revalidatePath(`/article/${slug}`);
}
