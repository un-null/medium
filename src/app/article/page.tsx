import { NoContent } from "@/components/layout/no-content";
import { getArticles } from "@/lib/notion";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import Image from "next/image";

export default async function Article() {
	const articles = await getArticles();

	return (
		<div>
			{articles.length === 0 ? (
				<NoContent />
			) : (
				<ul className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3">
					{articles.map((article) => (
						<Card
							key={article.id}
							className="bg-zinc-900/50 pt-0 border-zinc-600 aspect-square"
						>
							<a href={`/article/${article.id}`}>
								<CardContent className="grid aspect-[4/3] place-items-center text-zinc-400 hover:text-zinc-100 bg-zinc-950 rounded-t-xl">
									<p className="mt-4 text-sm md:text-base">{article.title}</p>
								</CardContent>
								<CardFooter className="flex items-center justify-center space-x-2 text-sm text-zinc-500 p-0 mt-3 sm:mt-4">
									<p>編纂員: {article?.name}</p>
									<Image
										src={article?.avatar}
										width={20}
										height={20}
										alt={article?.name}
										className="rounded-full"
									/>
								</CardFooter>
							</a>
						</Card>
					))}
				</ul>
			)}
		</div>
	);
}
