import { logoutAction } from "@/actions/auth";
import { db } from "@/lib/db";
import { articles, authors } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

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
					<Link
						href="/editor/new"
						className="rounded bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
					>
						+ New Article
					</Link>
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
					<Link
						key={article.id}
						href={`/editor/${article.id}`}
						className="flex items-center justify-between rounded border border-zinc-800 px-4 py-3 hover:border-zinc-600"
					>
						<div className="space-y-0.5 min-w-0">
							<p className="text-sm font-medium truncate">{article.title}</p>
							<p className="text-xs text-zinc-500">
								{article.date} · {article.authorName}
							</p>
						</div>
						<span
							className={`ml-4 shrink-0 rounded px-2 py-0.5 text-xs ${
								article.status === "published"
									? "bg-green-900 text-green-300"
									: "bg-zinc-800 text-zinc-400"
							}`}
						>
							{article.status}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
