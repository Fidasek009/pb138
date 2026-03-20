import { useEffect, useState } from "react";

export type ChatTheme = "light" | "dark";

interface UseSyncedThemeReturn {
	theme: ChatTheme;
	toggleTheme: () => void;
	isDark: boolean;
}

export function useSyncedTheme(): UseSyncedThemeReturn {
	const [theme, setTheme] = useState<ChatTheme>(() => {
		if (typeof document === "undefined") return "light";
		return document.documentElement.classList.contains("dark")
			? "dark"
			: "light";
	});

	// Detect theme from document
	useEffect(() => {
		const detectTheme = () => {
			const isDark = document.documentElement.classList.contains("dark");
			setTheme(isDark ? "dark" : "light");
		};

		detectTheme();

		const observer = new MutationObserver(detectTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return {
		theme,
		toggleTheme,
		isDark: theme === "dark",
	};
}
