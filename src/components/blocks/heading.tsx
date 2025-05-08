import type { Heading3BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich-text";

export const Heading = ({ block }: { block: Heading3BlockObjectResponse }) => {
	const id = block.id;
	const text = "heading_3" in block ? block.heading_3.rich_text : [];

	return (
		<h3 id={id} className="my-4 text-lg font-bold">
			<RichText text={text} />
		</h3>
	);
};
