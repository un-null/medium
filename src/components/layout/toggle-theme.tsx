"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/shadcn/components/ui/button";
import { LampCeiling } from "lucide-react";

export function ToggleTheme() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<Button
			onClick={() => {
				theme === "light" ? setTheme("dark") : setTheme("light");
			}}
			variant={"link"}
			className="cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
		>
			<LampCeiling
				className={mounted && theme === "light" ? "text-yellow-500" : undefined}
			/>
		</Button>
	);
}
