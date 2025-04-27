"use client";
import { Button } from "@/shadcn/components/ui/button";
import { usePathname } from "next/navigation";

import { Home, Mailbox, Newspaper, Package } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/shadcn/components/ui/card";

export function BottomNav() {
	const pathname = usePathname();
	const navItems = [
		{
			href: "/",
			icon: <Home />,
		},
		{
			href: "/article",
			icon: <Newspaper />,
		},
		{
			href: "/work",
			icon: <Package />,
		},
		{
			href: "/contact",
			icon: <Mailbox />,
		},
	];

	return (
		<Card className="sticky mx-auto py-2 px-4">
			<nav className="flex gap-4 bottom-8 mx-auto rounded-xl w-fit">
				{navItems.map((item) => (
					<Link key={item.href} href={item.href}>
						<Button
							variant={"ghost"}
							size={"icon"}
							className={`cursor-pointer ${pathname === item.href ? "" : "text-gray-400"}`}
						>
							{item.icon}
						</Button>
					</Link>
				))}
			</nav>
		</Card>
	);
}
