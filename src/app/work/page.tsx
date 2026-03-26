import { NoContent } from "@/components/layout/no-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Works",
	description: "Comming Soon",
	openGraph: {
		title: "Works",
		description: "Comming Soon",
		siteName: "Medium",
		images: [{ url: "/og.png", alt: "medium-og" }],
	},
};

export default async function Work() {
	return (
		<div className="space-y-8 mt-4">
			<h1 className="text-2xl px-4">Works</h1>
			<NoContent />
		</div>
	);
}
