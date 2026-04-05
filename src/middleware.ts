import { verifyToken } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/editor/:path*"],
};

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/editor/login") return NextResponse.next();

	const token = request.cookies.get("editor_session")?.value;
	const authorId = token ? await verifyToken(token) : null;

	if (!authorId) {
		return NextResponse.redirect(new URL("/editor/login", request.url));
	}

	return NextResponse.next();
}
