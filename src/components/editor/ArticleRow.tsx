"use client";

import { deleteArticle } from "@/actions/article";
import Link from "next/link";
import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
	id: string;
	title: string;
	date: string;
	authorName: string;
	status: string;
}

export function ArticleRow({ id, title, date, authorName, status }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const isDraft = status === "draft";

	function handleDelete() {
		startTransition(async () => {
			await deleteArticle(id);
			dialogRef.current?.close();
			router.refresh();
		});
	}

	return (
		<div className="flex items-center gap-2">
			<Link
				href={`/editor/${id}`}
				className="flex flex-1 items-center justify-between rounded border border-zinc-200 dark:border-zinc-800 px-4 py-3 hover:border-zinc-400 dark:hover:border-zinc-600 min-w-0"
			>
				<div className="space-y-0.5 min-w-0">
					<p className="text-sm font-medium truncate">{title}</p>
					<p className="text-xs text-zinc-500">
						{date} · {authorName}
					</p>
				</div>
				<span
					className={`ml-4 shrink-0 rounded px-2 py-0.5 text-xs ${
						status === "published"
							? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
							: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
					}`}
				>
					{status}
				</span>
			</Link>

			{isDraft && (
				<button
					type="button"
					onClick={() => dialogRef.current?.showModal()}
					className="cursor-pointer shrink-0 rounded border border-zinc-200 dark:border-zinc-800 px-2 py-2 text-xs text-zinc-400 hover:border-red-400 dark:hover:border-red-800 hover:text-red-500 dark:hover:text-red-400"
					aria-label={`Delete ${title}`}
				>
					✕
				</button>
			)}

			<dialog
				ref={dialogRef}
				className="rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-zinc-100 backdrop:bg-black/60 max-w-sm w-full mx-auto my-auto"
			>
				<p className="text-sm font-medium mb-1">Delete article?</p>
				<p className="text-xs text-zinc-400 mb-5 truncate">"{title}"</p>
				<div className="flex justify-end gap-3">
					<button
						type="button"
						onClick={() => dialogRef.current?.close()}
						className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-zinc-400"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleDelete}
						disabled={isPending}
						className="rounded bg-red-900 px-3 py-1.5 text-sm text-red-200 hover:bg-red-800 disabled:opacity-50"
					>
						{isPending ? "Deleting…" : "Delete"}
					</button>
				</div>
			</dialog>
		</div>
	);
}
