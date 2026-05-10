import { useState, useEffect } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

const getInitialTheme = (): "dark" | "light" => {
	if (typeof window === "undefined") return "dark";
	const stored = localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;
	return "dark";
};

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<button
			onClick={toggle}
			aria-label="Toggle theme"
			className="p-2 rounded-lg text-alvaro-muted hover:text-alvaro-primary transition-colors duration-200"
		>
			{theme === "dark" ? (
				<Sun size={20} weight="bold" />
			) : (
				<Moon size={20} weight="bold" />
			)}
		</button>
	);
};
