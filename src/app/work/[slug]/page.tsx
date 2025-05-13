import { BlockToJSX } from "@/components/blocks/block-to-jsx";
import { TOC } from "@/components/blocks/toc";
import { ClapButton } from "@/components/layout/clap-button";
import { getPageById, getWorkById } from "@/lib/notion";

import { MoveLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	const work = await getWorkById(slug);

	if (!work) {
		return {
			title: "Work Not Found",
		};
	}

	return {
		title: work.title[0],
		openGraph: {
			title: work.title[0],
			images: [{ url: "/og.png", alt: "medium-og" }],
		},
		twitter: {
			card: "summary",
			title: `${work.title[0]}`,
			images: [{ url: "/og.png", alt: "medium-og" }],
		},
	};
}

export default async function WorkId({ params }: Props) {
	const { slug } = await params;
	const work = await getWorkById(slug);

	if (!work) {
		return notFound();
	}

	const blocks = await getPageById(slug);
	const headings = blocks.filter((block) =>
		["heading_1", "heading_2", "heading_3"].includes(block.type),
	);

	return (
		<div className="space-y-6">
			<Link
				href="/work"
				className="my-8 block px-8 sm:px-4 w-fit text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
			>
				<MoveLeft />
			</Link>
			<div className="grid place-items-center gap-4 px-4">
				<h1 className="px-4 text-xl font-bold">{work.title}</h1>
				<div className="flex items-center justify-center space-x-2 text-sm text-zinc-500">
					<p>編纂員: {work.name}</p>
					<Image
						src={work.avatar}
						width={20}
						height={20}
						alt={work.name}
						className="rounded-full"
					/>
				</div>
			</div>
			<ul className="mx-auto mt-10 px-4 text-sm sm:text-base">
				{headings.length !== 0 && <TOC headings={headings} />}

				{blocks.map((block) => (
					<BlockToJSX key={block.id} block={block} />
				))}
			</ul>

			<ClapButton slug={slug} initialClaps={work.claps} />
		</div>
	);
}
