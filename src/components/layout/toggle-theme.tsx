"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/shadcn/components/ui/button";

export function ToggleTheme() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			onClick={() => {
				theme === "light" ? setTheme("dark") : setTheme("light");
			}}
			variant={"link"}
			className="cursor-pointer"
		>
			{theme === "light" ? "dark" : "light"}
		</Button>
	);
}
