import { NoContent } from "@/components/layout/no-content";
import { getAllPostsMeta } from "@/lib/posts";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import Link from "next/link";

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
						<Card
							key={article.slug}
							className="p-0 overflow-hidden border-none shadow-none bg-transparent"
						>
							<Link href={`/article/${article.slug}`} className="group">
								<CardContent className="aspect-square bg-slate-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center p-6 transition-colors group-hover:bg-slate-200 dark:group-hover:bg-zinc-800">
									<div className="w-full h-full bg-white dark:bg-zinc-950 rounded-sm shadow-sm flex flex-col p-4 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
										<span className="text-[10px] font-mono text-zinc-400 mb-2">
											{article.date.replace(/-/g, ".")}
										</span>
										<p className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
											{article.title}
										</p>
										<div className="mt-auto space-y-1 opacity-20">
											<div className="h-1 w-full bg-zinc-400 rounded-full" />
											<div className="h-1 w-3/4 bg-zinc-400 rounded-full" />
										</div>
									</div>
								</CardContent>
							</Link>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
