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
	return <NoContent />;
}
