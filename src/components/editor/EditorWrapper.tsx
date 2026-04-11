"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type TiptapEditor from "./TiptapEditor";

const TiptapEditorDynamic = dynamic(() => import("./TiptapEditor"), {
	ssr: false,
	loading: () => (
		<div className="p-4 text-zinc-400 text-sm">Loading editor...</div>
	),
});

export function EditorWrapper(props: ComponentProps<typeof TiptapEditor>) {
	return <TiptapEditorDynamic {...props} />;
}
