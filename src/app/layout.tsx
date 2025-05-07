import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { BottomNav } from "@/components/layout/bottom-nav";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: { default: "Medium", template: "%s | Medium" },
	description:
		"A private media platform that shares passion, with null as the medium.",
	openGraph: {
		title: "Medium",
		description:
			"A private media platform that shares passion, with null as the medium.",
		siteName: "Medium",
		images: [{ url: "/og.png", alt: "medium-og" }],
	},

	twitter: {
		card: "summary",
		site: "@Medium",
		creator: "@null",
		images: [{ url: "/og.png", alt: "medium-og" }],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistMono.className} antialiased grid grid-rows-[1fr_auto] min-h-dvh max-w-screen-md w-full mx-auto p-4 relative`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="py-4">{children}</main>

					<BottomNav />
				</ThemeProvider>
			</body>
		</html>
	);
}
