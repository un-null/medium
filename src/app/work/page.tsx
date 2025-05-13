import { NoContent } from "@/components/layout/no-content";
import { getWorks } from "@/lib/notion";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Works",
	description: "Comming Soon",
	openGraph: {
		title: "Works",
		description: "Comming Soon",
		siteName: "Medium",
		images: [{ url: "/og.png", alt: "medium-og" }],
	},
};

export default async function Work() {
	const works = await getWorks();

	return (
		<div className="space-y-8 mt-4">
			<h1 className="text-2xl px-4">Works</h1>
			{works.length === 0 ? (
				<NoContent />
			) : (
				<ul className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3">
					{works.map((work) => (
						<Card key={work.id} className="p-0 aspect-square">
							<a href={`/work/${work.id}`}>
								<CardContent className="grid aspect-[4/3] place-items-center text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground  dark:bg-zinc-950 rounded-t-xl border-b">
									<p className="mt-4 text-sm md:text-base">{work.title}</p>
								</CardContent>
								<CardFooter className="flex items-center justify-center space-x-2 text-sm text-zinc-500 p-0 mt-3 sm:mt-4 cursor-default">
									<p className="text-xs sm:text-sm">編纂員: {work?.name}</p>
									<Image
										src={work?.avatar}
										width={16}
										height={16}
										alt={work?.name}
										className="rounded-full sm:w-5 sm:h-5"
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
