import { EditorWrapper } from "@/components/editor/EditorWrapper";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditorArticlePage({ params }: Props) {
	const { id } = await params;

	const rows = await db
		.select()
		.from(articles)
		.where(eq(articles.id, id))
		.limit(1);

	const article = rows[0];
	if (!article) return notFound();

	return (
		<EditorWrapper
			id={article.id}
			initialTitle={article.title}
			initialDate={article.date}
			initialSlug={article.slug}
			initialDescription={article.description ?? undefined}
			initialContent={article.content_mdx}
			initialStatus={article.status as "draft" | "published"}
		/>
	);
}
