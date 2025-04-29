import { getLatestArticles } from "@/lib/notion";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default async function Home() {
	const latestArticles = await getLatestArticles();

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

			{/* <section className="my-8">
				<h1 className="mb-2 text-center text-2xl">Advertisement</h1>
				<p className="text-center text-zinc-400">- Rent For Free -</p>

				<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
					<Card className="aspect-square pt-0 bg-zinc-900/50">
						<CardContent className="grid aspect-[4/3] place-items-center rounded-t-xl bg-zinc-950 text-zinc-400 hover:text-zinc-100">
							<p className="mt-4 text-sm md:text-base">
								<Paintbrush type="paint" />
							</p>
						</CardContent>
						<CardFooter className="mt-3 flex items-center justify-center space-x-2 p-0 text-xs text-zinc-500 sm:mt-4 sm:text-sm">
							Coming Soon
						</CardFooter>
					</Card>
					<Card className="aspect-square pt-0 bg-zinc-900/50">
						<CardContent className="grid aspect-[4/3] place-items-center rounded-t-xl bg-zinc-950 text-zinc-400 hover:text-zinc-100">
							<p className="mt-4 text-sm md:text-base">
								<Paintbrush type="paint" />
							</p>
						</CardContent>
						<CardFooter className="mt-3 flex items-center justify-center space-x-2 p-0 text-xs text-zinc-500 sm:mt-4 sm:text-sm">
							Coming Soon
						</CardFooter>
					</Card>
				</div>
			</section> */}

			<section className="my-8">
				<h1 className="mb-2 text-center text-2xl">Latest Articles</h1>
				<a
					href="/article"
					className="underline-offset-3 flex items-center mx-auto justify-center text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground w-fit underline"
				>
					View All <ChevronRight size={16} />
				</a>

				<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
					{latestArticles.map((article) => (
						<Card key={article.id} className="p-0 aspect-square">
							<a href={`/article/${article.id}`}>
								<CardContent className="grid aspect-[4/3] place-items-center text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground  dark:bg-zinc-950 rounded-t-xl border-b">
									<p className="mt-4 text-sm md:text-base">{article.title}</p>
								</CardContent>
								<CardFooter className="flex items-center justify-center space-x-2 text-sm text-zinc-500 p-0 mt-3 sm:mt-4 cursor-default">
									<p className="text-xs sm:text-sm">編纂員: {article?.name}</p>
									<Image
										src={article?.avatar}
										width={16}
										height={16}
										alt={article?.name}
										className="rounded-full sm:w-5 sm:h-5"
									/>
								</CardFooter>
							</a>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
