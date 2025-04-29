import type { BulletedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich-text";

export const BulletedList = ({
	block,
}: {
	block: BulletedListItemBlockObjectResponse;
}) => {
	return (
		<li className="list-inside list-disc">
			<RichText text={block.bulleted_list_item.rich_text} />
		</li>
	);
};
