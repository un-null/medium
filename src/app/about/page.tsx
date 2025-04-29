import { BlockToJSX } from "@/components/blocks/block-to-jsx";
import { getHome } from "@/lib/notion";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function About() {
	const blocks = await getHome();

	return (
		<div>
			<Link
				href="/"
				className="mt-4 block px-8 sm:px-4 w-fit text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
			>
				<MoveLeft />
			</Link>

			<ul className="mx-auto px-4">
				{blocks.map((block) => (
					<div key={block.id}>
						<BlockToJSX block={block} />
					</div>
				))}
			</ul>
		</div>
	);
}
