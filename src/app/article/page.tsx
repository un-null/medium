import { ArticleCard } from "@/components/ArticleCard";
import { NoContent } from "@/components/layout/no-content";
import { getAllPostsMeta } from "@/lib/posts";

export default async function Article() {
	"use cache";
	const articles = await getAllPostsMeta();

	return (
		<div className="space-y-8 mt-4">
			<h1 className="text-2xl px-4">Articles</h1>
			{articles.length === 0 ? (
				<NoContent />
			) : (
				<div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3">
					{articles.map((article) => (
						<ArticleCard
							key={article.slug}
							slug={article.slug}
							title={article.title}
							date={article.date}
						/>
					))}
				</div>
			)}
		</div>
	);
}
