"use client";

import { saveArticle } from "@/actions/article";
import { getPresignedUrl } from "@/actions/upload";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Props = {
	id: string;
	initialTitle: string;
	initialDate: string;
	initialSlug: string;
	initialDescription?: string;
	initialContent: string;
	initialStatus: "draft" | "published";
};

export default function TiptapEditor({
	id,
	initialTitle,
	initialDate,
	initialSlug,
	initialDescription,
	initialContent,
	initialStatus,
}: Props) {
	const [title, setTitle] = useState(initialTitle);
	const [date, setDate] = useState(initialDate);
	const [slug, setSlug] = useState(initialSlug);
	const [description, setDescription] = useState(initialDescription ?? "");
	const [status, setStatus] = useState<"draft" | "published">(initialStatus);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			Markdown.configure({ transformPastedText: true, linkify: false }),
			Image.configure({ allowBase64: false }),
			LinkExtension.configure({ openOnClick: false }),
			Youtube.configure({ width: 640, height: 360 }),
			Placeholder.configure({ placeholder: "Start writing..." }),
		],
		content: initialContent,
		editorProps: {
			attributes: {
				class:
					"prose prose-invert max-w-none min-h-[60vh] px-4 py-4 outline-none",
			},
		},
	});

	const handleImageUpload = useCallback(
		async (file: File) => {
			if (!editor) return;
			const { uploadUrl, fileUrl } = await getPresignedUrl(
				file.name,
				file.type,
			);
			await fetch(uploadUrl, {
				method: "PUT",
				body: file,
				headers: { "Content-Type": file.type },
			});
			editor.chain().focus().setImage({ src: fileUrl, alt: file.name }).run();
		},
		[editor],
	);

	useEffect(() => {
		if (!editor) return;
		editor.setOptions({
			editorProps: {
				attributes: {
					class:
						"prose prose-invert max-w-none min-h-[60vh] px-4 py-4 outline-none",
				},
				handlePaste: (_view, event) => {
					const items = event.clipboardData?.items;
					if (!items) return false;
					for (const item of Array.from(items)) {
						if (item.type.startsWith("image/")) {
							event.preventDefault();
							const file = item.getAsFile();
							if (file) handleImageUpload(file);
							return true;
						}
					}
					return false;
				},
			},
		});
	}, [editor, handleImageUpload]);

	const handleSave = async (nextStatus?: "draft" | "published") => {
		if (!editor) return;
		setSaving(true);
		setMessage("");
		try {
			const markdown = (
				editor.storage as unknown as Record<string, MarkdownStorage>
			).markdown.getMarkdown();
			const json = JSON.stringify(editor.getJSON());
			await saveArticle({
				id,
				title,
				date,
				slug,
				description: description || undefined,
				content_mdx: markdown,
				content_json: json,
				status: nextStatus ?? status,
			});
			if (nextStatus) setStatus(nextStatus);
			setMessage("Saved");
		} catch {
			setMessage("Error saving");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="flex flex-col min-h-dvh">
			{/* Toolbar */}
			<div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-zinc-800 bg-background px-4 py-2">
				<div className="flex items-center gap-2 flex-wrap">
					<Link
						href="/editor"
						className="px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200"
					>
						← Back
					</Link>
					<button
						type="button"
						onClick={() => editor?.chain().focus().toggleBold().run()}
						className={`px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400 ${editor?.isActive("bold") ? "bg-zinc-700" : ""}`}
					>
						B
					</button>
					<button
						type="button"
						onClick={() => editor?.chain().focus().toggleItalic().run()}
						className={`px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400 italic ${editor?.isActive("italic") ? "bg-zinc-700" : ""}`}
					>
						I
					</button>
					<button
						type="button"
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={`px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400 ${editor?.isActive("heading", { level: 2 }) ? "bg-zinc-700" : ""}`}
					>
						H2
					</button>
					<button
						type="button"
						onClick={() =>
							editor?.chain().focus().toggleHeading({ level: 3 }).run()
						}
						className={`px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400 ${editor?.isActive("heading", { level: 3 }) ? "bg-zinc-700" : ""}`}
					>
						H3
					</button>
					<button
						type="button"
						onClick={() => editor?.chain().focus().toggleBulletList().run()}
						className={`px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400 ${editor?.isActive("bulletList") ? "bg-zinc-700" : ""}`}
					>
						List
					</button>
					<button
						type="button"
						onClick={() => editor?.chain().focus().toggleBlockquote().run()}
						className={`px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400 ${editor?.isActive("blockquote") ? "bg-zinc-700" : ""}`}
					>
						Quote
					</button>
					<label className="px-2 cursor-pointer py-1 text-xs rounded border border-zinc-700 hover:border-zinc-400">
						Image
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) handleImageUpload(file);
								e.target.value = "";
							}}
						/>
					</label>
				</div>

				<div className="flex items-center gap-2">
					{message && <span className="text-xs text-zinc-400">{message}</span>}
					<button
						type="button"
						onClick={() => handleSave("draft")}
						disabled={saving}
						className="rounded cursor-pointer border border-zinc-700 px-3 py-1.5 text-xs hover:border-zinc-400 disabled:opacity-50"
					>
						Save Draft
					</button>
					<button
						type="button"
						onClick={() => handleSave("published")}
						disabled={saving}
						className="rounded cursor-pointer bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
					>
						{status === "published" ? "Update" : "Publish"}
					</button>
				</div>
			</div>

			{/* Meta fields */}
			<div className="border-b border-zinc-800 px-4 py-3 space-y-2">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Title"
					className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-zinc-600"
				/>
				<div className="flex gap-3 flex-wrap text-xs text-zinc-500">
					<label className="flex items-center gap-1">
						Slug:
						<input
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							className="bg-transparent outline-none border-b border-zinc-700 focus:border-zinc-400 px-1"
						/>
					</label>
					<label className="flex items-center gap-1">
						Date:
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="bg-transparent outline-none border-b border-zinc-700 focus:border-zinc-400 px-1"
						/>
					</label>
					<label className="flex items-center gap-1">
						Description:
						<input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="bg-transparent outline-none border-b border-zinc-700 focus:border-zinc-400 px-1 w-48"
						/>
					</label>
				</div>
			</div>

			{/* Editor */}
			<EditorContent editor={editor} className="flex-1" />
		</div>
	);
}
