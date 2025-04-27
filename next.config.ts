import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://s3-us-west-2.amazonaws.com/**")],
	},
};

export default nextConfig;
