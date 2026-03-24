import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		domains: ["s3-us-west-2.amazonaws.com"],
	},
	cacheComponents: true,

	experimental: {
		// dynamicIO: true,
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [["remark-gfm"], ["remark-frontmatter"]],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
