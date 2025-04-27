import { getLatestArticles } from "@/lib/notion";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { ChevronRight, Paintbrush } from "lucide-react";
import Image from "next/image";

export default async function Home() {
	const latestArticles = await getLatestArticles();

	return (
		<div className="flex flex-col gap-8 px-4">
			<p className="leading-8">
				ここは私
				nullを媒介とし、みんなの「興味」「体験」「熱中」を伝えるプライベートメディアです。
				<br />
				文章でも作品でも、形式は問いません。
			</p>

			<a href="/about">
				<Card className="p-1">
					<CardContent className="flex gap-2 p-6">
						<p>medium とは</p>
						<ChevronRight size={20} />
					</CardContent>
				</Card>
			</a>

			<section className="my-8">
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
			</section>

			<section className="my-8">
				<h1 className="mb-2 text-center text-2xl">Latest Articles</h1>
				<a
					href="/article"
					className="underline-offset-3 flex items-center justify-center text-zinc-400 underline"
				>
					View All <ChevronRight size={16} color="#a1a1aa" />
				</a>

				<div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
					{latestArticles.map((article) => (
						<Card
							key={article.id}
							className="bg-zinc-900/50 pt-0 aspect-square"
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
				</div>
			</section>
		</div>
	);
}
