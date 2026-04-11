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
		<span className="block relative w-full aspect-video overflow-hidden rounded-lg my-6">
			{!loaded && (
				<span className="absolute inset-0 skeleton-shimmer z-10" />
			)}
			<Image
				src={src}
				alt={alt}
				fill
				sizes="(max-width: 768px) 100vw, 80vw"
				onLoad={() => setLoaded(true)}
				className={`object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
			/>
		</span>
	);
}
