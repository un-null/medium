"use client";
import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { RichText } from "./rich-text";
import { convBgColor } from "@/lib/notion";
import { useTheme } from "next-themes";

export const Callout = ({ block }: { block: CalloutBlockObjectResponse }) => {
	const callout = {
		icon: "callout" in block ? block.callout.icon : null,
		text: "callout" in block ? block.callout.rich_text : [],
		color: "callout" in block ? block.callout.color : "default",
	};

	const { theme } = useTheme();

	return (
		<div className={`flex gap-2 p-4 ${convBgColor(callout.color)}`}>
			<div className="h-auto w-auto p-1 text-xl">
				{callout.icon?.type === "external" && (
					<img
						src={
							theme === "light"
								? `${callout.icon.external.url}?mode=light`
								: `${callout.icon.external.url}?mode=dark`
						}
						alt=""
						className="block h-6 w-6 object-cover"
					/>
				)}
				{callout.icon?.type === "emoji" && <div>{callout.icon.emoji}</div>}
			</div>
			<div className="flex-1">
				<RichText text={callout.text} />
			</div>
		</div>
	);
};
