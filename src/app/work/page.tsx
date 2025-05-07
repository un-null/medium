import { NoContent } from "@/components/layout/no-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Works",
	description: "Comming Soon",
	openGraph: {
		title: "Works",
		description: "Comming Soon",
		siteName: "Medium",
	},
};

export default function Contact() {
	return <NoContent />;
}
