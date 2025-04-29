"use client";

import { Button } from "@/shadcn/components/ui/button";
import { usePathname } from "next/navigation";

import { Home, Mailbox, Newspaper, Package } from "lucide-react";
import Link from "next/link";
import { Card } from "@/shadcn/components/ui/card";
import { Separator } from "@/shadcn/components/ui/separator";
import { ToggleTheme } from "./toggle-theme";

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

	const isActive = (href: string): string => {
		if (href === "/") {
			return pathname === "/" ? "" : "text-gray-400";
		}

		return pathname.startsWith(href) ? "" : "text-gray-400";
	};

	return (
		<Card className="sticky bottom-8 mx-auto py-2 px-4">
			<nav className="flex gap-4 rounded-xl">
				{navItems.map((item) => (
					<Link key={item.href} href={item.href}>
						<Button
							variant={"ghost"}
							size={"icon"}
							className={`cursor-pointer ${isActive(item.href)}`}
						>
							{item.icon}
						</Button>
					</Link>
				))}
				<Separator orientation="vertical" />
				<ToggleTheme />
			</nav>
		</Card>
	);
}
