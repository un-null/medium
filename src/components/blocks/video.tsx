import type { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function Video({ block }: { block: VideoBlockObjectResponse }) {
	const url = block.video.type === "external" ? block.video.external.url : "";

	return (
		<iframe
			src={url}
			title="video"
			loading="lazy"
			allowFullScreen
			className="w-full aspect-video"
		/>
	);
}
