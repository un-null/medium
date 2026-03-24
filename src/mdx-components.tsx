import type { MDXComponents } from "mdx/types";

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
			<p className="whitespace-pre-wrap break-words leading-loose">{children}</p>
		),
		ul: ({ children }) => <ul className="my-4">{children}</ul>,
		li: ({ children }) => (
			<li className="list-inside list-disc">{children}</li>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-s-4 p-4 border-neutral-400 text-neutral-200">
				{children}
			</blockquote>
		),
		a: ({ href, children }) => (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="underline underline-offset-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
			>
				{children}
			</a>
		),
		img: ({ src, alt }) => (
			<div className="w-full mx-auto">
				<img
					src={src}
					alt={alt ?? ""}
					className="w-full aspect-video object-contain"
				/>
			</div>
		),
		strong: ({ children }) => (
			<strong className="font-bold">{children}</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		code: ({ children }) => (
			<code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
				{children}
			</code>
		),
		pre: ({ children }) => (
			<pre className="my-4 overflow-x-auto rounded bg-muted p-4 font-mono text-sm">
				{children}
			</pre>
		),
		...components,
	};
}
