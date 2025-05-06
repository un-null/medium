"use server";

import { notion } from "@/lib/notion";
import { revalidatePath } from "next/cache";

export async function clap(slug: string, value: number) {
	try {
		await notion.pages.update({
			page_id: slug,
			properties: {
				Claps: {
					number: value,
				},
			},
		});

		revalidatePath(`/article/${slug}`);
	} catch (error) {
		throw Error("Error");
	}
}
