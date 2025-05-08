import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Paragraph } from "./paragraph";
import { BulletedList } from "./bulleted-list";
import { ImageBlock } from "./image-block";
import { Callout } from "./callout";
import { Heading } from "./heading";
import { Video } from "./video";
import { Quote } from "./quote";

export const BlockToJSX = ({ block }: { block: BlockObjectResponse }) => {
	const blockType = block.type;

	switch (blockType) {
		case "paragraph":
			return <Paragraph block={block} />;
		case "heading_3":
			return <Heading block={block} />;
		case "bulleted_list_item":
			return (
				<ul className="my-4">
					<BulletedList block={block} />
				</ul>
			);
		case "image":
			return <ImageBlock block={block} />;
		case "callout":
			return <Callout block={block} />;
		case "quote":
			return <Quote block={block} />;
		case "video":
			return <Video block={block} />;
		default:
			return <></>;
	}
};
