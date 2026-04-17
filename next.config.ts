import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.is-be.zip",
			},
		],
		unoptimized: true,
	},
	cacheComponents: true,
};

export default nextConfig;
