import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3-us-west-2.amazonaws.com",
			},
		],
	},
	cacheComponents: true,
};

export default nextConfig;
