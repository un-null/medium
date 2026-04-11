import { ArticleCard } from "@/components/ArticleCard";
import { getAllPostsMeta } from "@/lib/posts";
import { Card, CardContent } from "@/shadcn/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";

async function LatestArticles() {
	const latestArticles = (await getAllPostsMeta()).slice(0, 3);

	return (
		<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
			{latestArticles.map((article) => (
				<ArticleCard
					key={article.slug}
					slug={article.slug}
					title={article.title}
					date={article.date}
				/>
			))}
		</div>
	);
}

export default function Home() {
	return (
		<div className="flex flex-col gap-8 px-4">
			<div className="mt-4">
				<h1 className="text-2xl">medium</h1>

				<p className="leading-8 mt-4">
					ここは null を媒介として、みんなの "熱"
					を伝えるプライベートメディアです。
					<br />
					文章でも作品でも、形式は問いません。
				</p>
			</div>

			<a href="/about">
				<Card className="p-1">
					<CardContent className="flex items-center gap-2 p-6 text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground">
						<p>medium とは</p>
						<ChevronRight size={20} />
					</CardContent>
				</Card>
			</a>

			<section className="my-8">
				<h1 className="mb-2 text-center text-2xl">Latest Articles</h1>
				<a
					href="/article"
					className="underline-offset-3 flex items-center mx-auto justify-center text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground w-fit underline"
				>
					View All <ChevronRight size={16} />
				</a>

				<Suspense
					fallback={
						<div className="mt-6 text-center text-zinc-400 text-sm">
							Loading...
						</div>
					}
				>
					<LatestArticles />
				</Suspense>
			</section>
		</div>
	);
}
