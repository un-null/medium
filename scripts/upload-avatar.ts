/**
 * Upload an avatar image to R2 and print the public URL.
 *
 * Usage:
 *   npx tsx scripts/upload-avatar.ts <username> <filepath>
 *
 * Example:
 *   npx tsx scripts/upload-avatar.ts ahab ./ahab.jpg
 *
 * After running, update the DB:
 *   UPDATE authors SET avatar = '<printed-url>' WHERE username = '<username>';
 * Or via drizzle-kit studio, or Turso CLI:
 *   turso db shell <db-name> "UPDATE authors SET avatar = '<url>' WHERE username = '<username>';"
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import fs from "node:fs";
import path from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const [username, filepath] = process.argv.slice(2);

if (!username || !filepath) {
	console.error("Usage: npx tsx scripts/upload-avatar.ts <username> <filepath>");
	process.exit(1);
}

if (!fs.existsSync(filepath)) {
	console.error(`File not found: ${filepath}`);
	process.exit(1);
}

const accountId = process.env.R2_ACCOUNT_ID ?? "";
const accessKeyId = process.env.R2_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? "";
const bucketName = process.env.R2_BUCKET_NAME ?? "";
const publicUrl = process.env.R2_PUBLIC_URL ?? "";

const s3 = new S3Client({
	region: "auto",
	endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
	credentials: { accessKeyId, secretAccessKey },
});

async function main() {
	const ext = path.extname(filepath).slice(1).toLowerCase();
	const key = `avatars/${username}.${ext}`;
	const body = fs.readFileSync(filepath);
	const contentType = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";

	await s3.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: body,
			ContentType: contentType,
		}),
	);

	const url = `${publicUrl}/${key}`;
	console.log(`\nUploaded successfully!\nPublic URL: ${url}`);
	console.log("\nTo update the DB, run:");
	console.log(`  turso db shell <db-name> "UPDATE authors SET avatar = '${url}' WHERE username = '${username}';"`);
}

main();
