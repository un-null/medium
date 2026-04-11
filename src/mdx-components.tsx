import type { MDXComponents } from "mdx/types";
import { ArticleImage } from "@/components/ArticleImage";

function getYouTubeId(url: string): string | null {
	const m = url.match(
		/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/,
	);
	return m ? m[1] : null;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="my-4 text-2xl font-bold">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="my-4 text-xl font-bold">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="my-4 text-lg font-bold">{children}</h3>
		),
		p: ({ children }) => (
			<p className="my-4 whitespace-pre-wrap break-words leading-loose">
				{children}
			</p>
		),
		ul: ({ children }) => (
			<ul className="my-4 list-disc list-inside">{children}</ul>
		),
		li: ({ children }) => <li className="my-1">{children}</li>,
		blockquote: ({ children }) => (
			<blockquote className="border-s-4 py-1 px-4 border-neutral-400 text-neutral-400 italic bg-neutral-900/30 rounded-r">
				{children}
			</blockquote>
		),
		a: ({ href, children }) => {
			const videoId = href ? getYouTubeId(href) : null;
			if (videoId) {
				return (
					<span className="my-6 aspect-video w-full block">
						<iframe
							src={`https://www.youtube.com/embed/${videoId}`}
							title="YouTube video"
							className="h-full w-full rounded-lg"
							allowFullScreen
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						/>
					</span>
				);
			}
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
				>
					{children}
				</a>
			);
		},
		img: ({ src, alt }) => (
			<ArticleImage src={src ?? ""} alt={alt ?? ""} />
		),
		strong: ({ children }) => (
			<strong className="font-bold text-neutral-100">{children}</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		code: ({ children }) => (
			<code className="rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-sm text-neutral-200">
				{children}
			</code>
		),
		pre: ({ children }) => (
			<pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 font-mono text-sm border border-neutral-800">
				{children}
			</pre>
		),
		...components,
	};
}
