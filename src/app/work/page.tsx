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

export default function Contact() {
	return <NoContent />;
}
