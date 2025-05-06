import { BlockToJSX } from "@/components/blocks/block-to-jsx";
import { LinkCard } from "@/components/blocks/link-card";
import { ClapButton } from "@/components/layout/clap-button";
import { getArticleById, getPageById } from "@/lib/notion";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticleId({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = await getArticleById(slug);

	if (!article) {
		return notFound();
	}

	const blocks = await getPageById(slug);

	return (
		<div className="space-y-6">
			<Link
				href="/article"
				className="my-8 block px-8 sm:px-4 w-fit text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
			>
				<MoveLeft />
			</Link>
			<div className="grid place-items-center gap-4 px-4">
				<h1 className="px-4 text-xl font-bold">{article.title}</h1>
				<div className="flex items-center justify-center space-x-2 text-sm text-zinc-500">
					<p>編纂員: {article.name}</p>
					<Image
						src={article.avatar}
						width={20}
						height={20}
						alt={article.name}
						className="rounded-full"
					/>
				</div>
			</div>
			<ul className="mx-auto mt-10 px-4 text-sm sm:text-base">
				{blocks.map((block) =>
					block.type === "bookmark" ? (
						<LinkCard key={block.id} block={block} />
					) : (
						<BlockToJSX key={block.id} block={block} />
					),
				)}
			</ul>

			<ClapButton slug={slug} initialClaps={article.claps} />
		</div>
	);
}
