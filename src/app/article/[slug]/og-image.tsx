import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs";
export const alt = "Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	if (!post) return new Response("Not Found", { status: 404 });

	const fontData = await fetch(
		new URL(
			"https://fonts.gstatic.com/s/notosansjp/v52/-Ky47oW6RFsS27bc89VnSg.ttf",
		),
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#f1f5f9",
				padding: "60px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "white",
					width: "420px",
					height: "480px",
					borderRadius: "8px",
					boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
					padding: "40px",
					border: "1px solid #e2e8f0",
					marginBottom: "40px",
				}}
			>
				<div
					style={{
						fontSize: 24,
						fontWeight: "bold",
						marginBottom: 20,
						color: "#94a3b8",
					}}
				>
					{post.date.replace(/-/g, ".")}
				</div>
				<div
					style={{
						fontSize: 32,
						fontWeight: "bold",
						color: "#1e293b",
						lineHeight: 1.4,
					}}
				>
					{post.title}
				</div>
				<div
					style={{
						marginTop: "auto",
						display: "flex",
						flexDirection: "column",
						gap: "8px",
					}}
				>
					<div
						style={{
							height: "4px",
							width: "100%",
							backgroundColor: "#f1f5f9",
							borderRadius: "2px",
						}}
					/>
					<div
						style={{
							height: "4px",
							width: "80%",
							backgroundColor: "#f1f5f9",
							borderRadius: "2px",
						}}
					/>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					alignItems: "center",
				}}
			>
				<div
					style={{
						fontSize: 48,
						fontWeight: "bold",
						color: "#0f172a",
						marginBottom: 8,
					}}
				>
					{post.title}
				</div>
				<div
					style={{
						fontSize: 24,
						color: "#64748b",
						display: "flex",
						gap: "16px",
					}}
				>
					<span>{post.date.replace(/-/g, "/")}に公開</span>
					<span>•</span>
					<span>編纂員: {post.name}</span>
				</div>
			</div>
		</div>,
		{
			...size,
			fonts: [{ name: "Noto Sans JP", data: fontData, style: "normal" }],
		},
	);
}
