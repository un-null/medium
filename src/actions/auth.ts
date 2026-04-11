"use server";

import { db } from "@/lib/db";
import { authors } from "@/lib/schema";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = { error: string } | null;

export async function loginAction(
	_prev: LoginState,
	formData: FormData,
): Promise<LoginState> {
	const username = formData.get("username")?.toString().trim() ?? "";
	const password = formData.get("password")?.toString() ?? "";

	const rows = await db
		.select()
		.from(authors)
		.where(eq(authors.username, username))
		.limit(1);

	const author = rows[0];
	if (!author) return { error: "ユーザー名またはパスワードが正しくありません" };

	const valid = await bcrypt.compare(password, author.password_hash);
	if (!valid) return { error: "ユーザー名またはパスワードが正しくありません" };

	const token = await signToken(author.id);
	const cookieStore = await cookies();
	cookieStore.set("editor_session", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24,
	});

	redirect("/editor");
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("editor_session");
	redirect("/editor/login");
}
