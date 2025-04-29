"use client";

import { useTheme } from "next-themes";

import { Button } from "@/shadcn/components/ui/button";
import { LampCeiling } from "lucide-react";

export function ToggleTheme() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			onClick={() => {
				theme === "light" ? setTheme("dark") : setTheme("light");
			}}
			variant={"link"}
			className="cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-foreground dark:hover:text-foreground"
		>
			<LampCeiling
				className={theme === "light" ? "text-yellow-500" : undefined}
			/>
		</Button>
	);
}
