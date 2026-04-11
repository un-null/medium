import { createArticle } from "@/actions/article";
import { redirect } from "next/navigation";

async function createAndRedirect() {
	"use server";
	const today = new Date().toISOString().slice(0, 10);
	const { id } = await createArticle({
		slug: `draft-${Date.now()}`,
		title: "Untitled",
		date: today,
		content_mdx: "",
	});
	redirect(`/editor/${id}`);
}

export default function NewArticlePage() {
	return (
		<div className="flex min-h-dvh items-center justify-center">
			<form action={createAndRedirect}>
				<button
					type="submit"
					className="rounded bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
				>
					Create New Article
				</button>
			</form>
		</div>
	);
}
