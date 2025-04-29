import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export const RichText = ({ text }: { text: RichTextItemResponse[] }) => {
	return (
		<p className="inline whitespace-pre-wrap break-words leading-loose">
			{text.length === 0 ? (
				<span className="block h-6" />
			) : (
				<>
					{text.map((textItem, index: number) => {
						if (textItem.href) {
							return (
								<a
									key={textItem.href}
									href={textItem.href}
									target="_blank"
									rel="noopener noreferrer"
									className="underline underline-offset-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
								>
									{textItem.plain_text}
								</a>
							);
						}
						return textItem.plain_text;
					})}
				</>
			)}
		</p>
	);
};
