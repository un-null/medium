import type {
	BlockObjectResponse,
	RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich-text";

type TocItem = {
	id: string;
	text: RichTextItemResponse[];
	indent: string;
};

const getTocItems = (headings: BlockObjectResponse[]): TocItem[] => {
	return headings
		.map((h) => {
			switch (h.type) {
				case "heading_1":
					return { id: h.id, text: h.heading_1.rich_text, indent: "" };
				case "heading_2":
					return { id: h.id, text: h.heading_2.rich_text, indent: "ml-4" };
				case "heading_3":
					return { id: h.id, text: h.heading_3.rich_text, indent: "ml-8" };
				default:
					return null;
			}
		})
		.filter(Boolean) as TocItem[];
};

export function TOC({ headings }: { headings: BlockObjectResponse[] }) {
	const tocItems = getTocItems(headings);

	console.log(tocItems);

	return (
		<details className="p-4 border mb-8">
			<summary className="cursor-pointer">
				<span className="ml-2">Table of Content</span>
			</summary>
			<nav className="flex flex-col gap-2 p-4 w-fit">
				{tocItems.map((item) => (
					<a
						key={item.id}
						href={`#${item.id}`}
						className={`underline text-neutral-400 hover:text-neutral-100 ${item.indent}`}
					>
						<RichText text={item.text} />
					</a>
				))}
			</nav>
		</details>
	);
}
