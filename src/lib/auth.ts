const SECRET = process.env.EDITOR_SECRET ?? "";

async function getKey(): Promise<CryptoKey> {
	const enc = new TextEncoder();
	return crypto.subtle.importKey(
		"raw",
		enc.encode(SECRET),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

export async function signToken(authorId: string): Promise<string> {
	const key = await getKey();
	const enc = new TextEncoder();
	const sig = await crypto.subtle.sign("HMAC", key, enc.encode(authorId));
	const hex = Array.from(new Uint8Array(sig))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return `${authorId}.${hex}`;
}

export async function verifyToken(token: string): Promise<string | null> {
	const dot = token.lastIndexOf(".");
	if (dot === -1) return null;

	const authorId = token.slice(0, dot);
	const sigHex = token.slice(dot + 1);

	const key = await getKey();
	const enc = new TextEncoder();
	const expected = await crypto.subtle.sign(
		"HMAC",
		key,
		enc.encode(authorId),
	);
	const expectedHex = Array.from(new Uint8Array(expected))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	// timing-safe compare
	if (sigHex.length !== expectedHex.length) return null;
	let diff = 0;
	for (let i = 0; i < sigHex.length; i++) {
		diff |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
	}
	return diff === 0 ? authorId : null;
}
