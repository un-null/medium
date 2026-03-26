import { NoContent } from "@/components/layout/no-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description: "Contact with null",
	openGraph: {
		title: "Contact",
		description: "Contact with null",
		siteName: "Medium",
		images: [{ url: "/og.png", alt: "medium-og" }],
	},
};

export default function Contact() {
	return (
		<div className="space-y-8 mt-4">
			<h1 className="text-2xl px-4">Contact</h1>
			<NoContent />
		</div>
	);
}
