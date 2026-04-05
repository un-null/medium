import { ClapButton } from "@/components/layout/clap-button";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";
import { useMDXComponents } from "@/mdx-components";
import { MoveLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { Suspense } from "react";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const article = await getPostBySlug(slug);

	if (!article) return { title: "Article Not Found" };

	return {
		title: article.title,
		openGraph: {
			title: article.title,
			images: [{ url: "/og.png", alt: "medium-og" }],
		},
		twitter: {
			card: "summary",
			title: article.title,
			images: [{ url: "/og.png", alt: "medium-og" }],
		},
	};
}

export async function generateStaticParams() {
	const posts = await getAllPostsMeta();
	return posts.map((post) => ({ slug: post.slug }));
}

async function ArticleContent({ slug }: { slug: string }) {
	const article = await getPostBySlug(slug);

	if (!article || !article.content_mdx) return notFound();

	const { content } = await compileMDX({
		source: article.content_mdx,
		options: {
			mdxOptions: {
				remarkPlugins: [remarkGfm],
			},
		},
		components: useMDXComponents({}),
	});

	return (
		<>
			<div className="grid place-items-center gap-4 px-4">
				<h1 className="px-4 text-xl font-bold">{article.title}</h1>
				<div className="flex items-center justify-center space-x-2 text-sm text-zinc-500">
					<p>編纂員: {article.name}</p>
					{article.avatar && (
						<Image
							src={article.avatar}
							width={20}
							height={20}
							alt={article.name}
							className="rounded-full"
						/>
					)}
				</div>
			</div>

			<div className="mx-auto mt-10 px-4 text-sm sm:text-base max-w-none">
				{content}
			</div>

			<ClapButton slug={slug} initialClaps={article.claps || 0} />
		</>
	);
}

export default async function ArticleId({ params }: Props) {
	const { slug } = await params;

	return (
		<div className="space-y-6">
			<Link
				href="/article"
				className="my-8 block px-8 sm:px-4 w-fit text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
			>
				<MoveLeft />
			</Link>

			<Suspense fallback={<div className="px-4 text-zinc-400">Loading...</div>}>
				<ArticleContent slug={slug} />
			</Suspense>
		</div>
	);
}
