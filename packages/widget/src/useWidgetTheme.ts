import { useEffect, useState } from "react";

export type WidgetTheme = "light" | "dark";

interface UseWidgetThemeReturn {
	theme: WidgetTheme;
	isDark: boolean;
}

/**
 * Hook to detect and sync with parent document theme
 * Watches for dark class on document and prefers-color-scheme media query
 */
export function useWidgetTheme(): UseWidgetThemeReturn {
	const [theme, setTheme] = useState<WidgetTheme>(() => {
		if (typeof document === "undefined") return "light";
		const root = document.documentElement;
		const isDark =
			root.classList.contains("dark") ||
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		return isDark ? "dark" : "light";
	});

	useEffect(() => {
		const detectTheme = () => {
			const root = document.documentElement;
			const isDark =
				root.classList.contains("dark") ||
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			setTheme(isDark ? "dark" : "light");
		};

		detectTheme();

		const observer = new MutationObserver(detectTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", detectTheme);

		return () => {
			observer.disconnect();
			mediaQuery.removeEventListener("change", detectTheme);
		};
	}, []);

	return {
		theme,
		isDark: theme === "dark",
	};
}
