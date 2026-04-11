import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const authors = sqliteTable("authors", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	password_hash: text("password_hash").notNull(),
	name: text("name").notNull(),
	avatar: text("avatar").notNull().default("/avatar.png"),
});

export const articles = sqliteTable("articles", {
	id: text("id").primaryKey(),
	slug: text("slug").notNull().unique(),
	title: text("title").notNull(),
	date: text("date").notNull(),
	author_id: text("author_id")
		.notNull()
		.references(() => authors.id),
	claps: integer("claps").notNull().default(0),
	status: text("status").notNull().default("draft"),
	description: text("description"),
	content_mdx: text("content_mdx").notNull(),
	content_json: text("content_json"),
	updated_at: integer("updated_at", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});
