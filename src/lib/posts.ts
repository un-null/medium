import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
// The root directory where your .mdx files live
const postsDirectory = path.join(process.cwd(), "content/articles");

export type PostMeta = {
	title: string;
	date: string;
	name: string;
	avatar?: string;
	claps?: number;
	draft: boolean;
	slug: string;
	description?: string;
	tags?: string[];
};

export async function getAllPostsMeta(): Promise<PostMeta[]> {
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const files = fs.readdirSync(postsDirectory);

	const posts = files
		.filter((filename) => filename.endsWith(".mdx"))
		.map((filename) => {
			const filePath = path.join(postsDirectory, filename);
			const fileContent = fs.readFileSync(filePath, "utf8");

			const { data } = matter(fileContent);

			return {
				...data,
				slug: filename.replace(".mdx", ""),
				draft: data.draft ?? false,
				claps: data.claps ?? 0,
			} as PostMeta;
		})
		.filter((post) => !post.draft)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return posts;
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
	const allPosts = await getAllPostsMeta();
	const post = allPosts.find((p) => p.slug === slug);

	return post || null;
}
