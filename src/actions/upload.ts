"use server";

import { verifyToken } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from "next/headers";

const s3 = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
	},
});

export async function getPresignedUrl(
	filename: string,
	contentType: string,
): Promise<{ uploadUrl: string; fileUrl: string }> {
	const cookieStore = await cookies();
	const token = cookieStore.get("editor_session")?.value;
	const authorId = token ? await verifyToken(token) : null;
	if (!authorId) throw new Error("Unauthorized");

	const ext = filename.split(".").pop() ?? "bin";
	const key = `articles/images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Key: key,
		ContentType: contentType,
	});

	const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
	const fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

	return { uploadUrl, fileUrl };
}
