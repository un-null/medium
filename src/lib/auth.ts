const TOKEN_TTL_SECONDS = 60 * 60 * 24;
const MIN_SECRET_LENGTH = 32;

function getSecret(): string {
	const secret = process.env.EDITOR_SECRET;
	if (!secret || secret.length < MIN_SECRET_LENGTH) {
		throw new Error(
			`EDITOR_SECRET must be set to at least ${MIN_SECRET_LENGTH} characters`,
		);
	}
	return secret;
}

async function getKey(): Promise<CryptoKey> {
	const enc = new TextEncoder();
	return crypto.subtle.importKey(
		"raw",
		enc.encode(getSecret()),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);
}

async function sign(payload: string): Promise<string> {
	const key = await getKey();
	const enc = new TextEncoder();
	const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
	return Array.from(new Uint8Array(sig))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export async function signToken(authorId: string): Promise<string> {
	const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
	const payload = `${authorId}.${exp}`;
	const sig = await sign(payload);
	return `${payload}.${sig}`;
}

export async function verifyToken(token: string): Promise<string | null> {
	const sigDot = token.lastIndexOf(".");
	if (sigDot === -1) return null;

	const payload = token.slice(0, sigDot);
	const sigHex = token.slice(sigDot + 1);

	const expDot = payload.lastIndexOf(".");
	if (expDot === -1) return null;

	const authorId = payload.slice(0, expDot);
	const exp = Number(payload.slice(expDot + 1));
	if (!authorId || !Number.isSafeInteger(exp)) return null;
	if (exp <= Math.floor(Date.now() / 1000)) return null;

	const expectedHex = await sign(payload);

	// timing-safe compare
	if (sigHex.length !== expectedHex.length) return null;
	let diff = 0;
	for (let i = 0; i < sigHex.length; i++) {
		diff |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
	}
	return diff === 0 ? authorId : null;
}
