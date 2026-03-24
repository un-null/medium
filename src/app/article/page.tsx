import { NoContent } from "@/components/layout/no-content";
import { getAllPostsMeta } from "@/lib/posts";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Articles",
	description: "Articles curated by editors",
	openGraph: {
		title: "Articles",
		description: "Articles curated by editors",
		siteName: "Medium",
		images: [{ url: "/og.png", alt: "medium-og" }],
	},
};

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
						<Card key={article.slug} className="p-0 aspect-square">
							<Link href={`/article/${article.slug}`}>
								<CardContent className="grid aspect-[4/3] place-items-center text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground  dark:bg-zinc-950 rounded-t-xl border-b px-4 text-center">
									<p className="mt-4 text-sm md:text-base font-medium leading-relaxed">
										{article.title}
									</p>
								</CardContent>
								<CardFooter className="flex items-center justify-center space-x-2 text-sm text-zinc-500 p-0 mt-3 sm:mt-4 cursor-default">
									<p className="text-xs sm:text-sm">編纂員: {article.name}</p>
									{article.avatar && (
										<Image
											src={article.avatar}
											width={16}
											height={16}
											alt={article.name}
											className="rounded-full sm:w-5 sm:h-5 object-cover"
										/>
									)}
								</CardFooter>
							</Link>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
