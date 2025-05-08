import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich-text";

export function Quote({ block }: { block: QuoteBlockObjectResponse }) {
	const text = "quote" in block ? block.quote.rich_text : [];

	return (
		<blockquote className="border-s-4 p-4 border-neutral-400 text-neutral-200">
			<RichText text={text} />
		</blockquote>
	);
}
