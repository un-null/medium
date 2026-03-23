import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

	experimental: {
		// dynamicIO: true,
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm, remarkFrontmatter],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
