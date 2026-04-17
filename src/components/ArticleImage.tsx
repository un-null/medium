"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
	src: string;
	alt: string;
}

export function ArticleImage({ src, alt }: Props) {
	const [loaded, setLoaded] = useState(false);

	return (
		<span className="block relative w-full my-6">
			{!loaded && (
				<span className="absolute inset-0 skeleton-shimmer rounded-lg z-10" />
			)}
			<Image
				src={src}
				alt={alt}
				width={0}
				height={0}
				sizes="100vw"
				onLoad={() => setLoaded(true)}
				className={`w-full h-auto rounded-lg transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
			/>
		</span>
	);
}
