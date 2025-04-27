import { ToggleTheme } from "./toggle-theme";

export function Header() {
	return (
		<header className="h-12 flex justify-between items-center w-full">
			<div>medium</div>
			<ToggleTheme />
		</header>
	);
}
