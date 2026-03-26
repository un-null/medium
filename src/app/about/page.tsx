import Introduction from "@/../content/introduction.mdx";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function About() {
	return (
		<div>
			<Link
				href="/"
				className="mt-4 block px-8 sm:px-4 w-fit text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
			>
				<MoveLeft />
			</Link>

			<div className="mx-auto px-4 text-sm sm:text-base">
				<Introduction />
			</div>
		</div>
	);
}