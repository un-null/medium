import { logoutAction } from "@/actions/auth";
import { createArticle } from "@/actions/article";
import { ArticleRow } from "@/components/editor/ArticleRow";
import { db } from "@/lib/db";
import { articles, authors } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

async function createAndRedirect() {
	"use server";
	const today = new Date().toISOString().slice(0, 10);
	const { id } = await createArticle({
		slug: `draft-${Date.now()}`,
		title: "Untitled",
		date: today,
		content_mdx: "",
	});
	redirect(`/editor/${id}`);
}

export default async function EditorPage() {
	const rows = await db
		.select({
			id: articles.id,
			slug: articles.slug,
			title: articles.title,
			date: articles.date,
			status: articles.status,
			updatedAt: articles.updated_at,
			authorName: authors.name,
		})
		.from(articles)
		.innerJoin(authors, eq(articles.author_id, authors.id))
		.orderBy(articles.date);

	const sorted = rows.sort((a, b) => (a.date > b.date ? -1 : 1));

	return (
		<div className="mx-auto max-w-screen-md px-4 py-8 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-bold">Editor</h1>
				<div className="flex gap-3">
					<form action={createAndRedirect}>
						<button
							type="submit"
							className="rounded bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
						>
							+ New Article
						</button>
					</form>
					<form action={logoutAction}>
						<button
							type="submit"
							className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-zinc-400"
						>
							Logout
						</button>
					</form>
				</div>
			</div>

			<div className="space-y-2">
				{sorted.map((article) => (
					<ArticleRow
						key={article.id}
						id={article.id}
						slug={article.slug}
						title={article.title}
						date={article.date}
						authorName={article.authorName}
						status={article.status}
					/>
				))}
			</div>
		</div>
	);
}
