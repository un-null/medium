import type { BookmarkBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import ogs from "open-graph-scraper";

// const { result } = await ogs({ url: block.bookmark.url });

export function LinkCard({ block }: { block: BookmarkBlockObjectResponse }) {
	return <p>link card</p>;
}
