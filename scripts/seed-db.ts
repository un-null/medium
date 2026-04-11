import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import matter from "gray-matter";
import { articles, authors } from "../src/lib/schema";

const client = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle(client);

const postsDirectory = path.join(process.cwd(), "content/articles");

// MDX frontmatter の name → author_id マッピング
const NAME_TO_AUTHOR_ID: Record<string, string> = {
	null: "null",
	えいはぶ: "ahab",
};

async function seed() {
	// 1. authors を INSERT
	const authorData = [
		{
			id: "null",
			username: "null",
			password_hash: await bcrypt.hash("Keit@0430", 12),
			name: "null",
			avatar: "/avatar.png",
		},
		{
			id: "ahab",
			username: "ahab",
			password_hash: await bcrypt.hash("CHANGE_ME", 12),
			name: "えいはぶ",
			avatar: "/avatar.png",
		},
	];

	for (const author of authorData) {
		await db.insert(authors).values(author).onConflictDoNothing();
		console.log(`✓ author: ${author.username}`);
	}

	// 2. articles を INSERT
	const files = fs
		.readdirSync(postsDirectory)
		.filter((f) => f.endsWith(".mdx"));

	for (const filename of files) {
		const slug = filename.replace(".mdx", "");
		const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
		const { data, content } = matter(raw);

		const authorId = NAME_TO_AUTHOR_ID[data.name] ?? "null";

		await db
			.insert(articles)
			.values({
				id: slug,
				slug,
				title: data.title ?? slug,
				date: data.date ?? new Date().toISOString().slice(0, 10),
				author_id: authorId,
				claps: data.claps ?? 0,
				status: data.draft ? "draft" : "published",
				description: data.description ?? null,
				content_mdx: content.trim(),
				content_json: null,
			})
			.onConflictDoNothing();

		console.log(`✓ article: ${slug} (author: ${authorId})`);
	}

	console.log("\nDone.");
	process.exit(0);
}

seed().catch((err) => {
	console.error(err);
	process.exit(1);
});
