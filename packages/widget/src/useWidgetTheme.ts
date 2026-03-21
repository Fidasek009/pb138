import { useEffect, useState } from "react";

export type WidgetTheme = "light" | "dark";

interface UseWidgetThemeReturn {
	theme: WidgetTheme;
	isDark: boolean;
	toggleTheme: () => void;
}

/**
 * Hook to detect and sync with parent document theme
 * Watches for dark class on document and dispatches toggle event
 */
export function useWidgetTheme(): UseWidgetThemeReturn {
	const [theme, setTheme] = useState<WidgetTheme>(() => {
		if (typeof document === "undefined") return "light";
		const root = document.documentElement;
		const isDark = root.classList.contains("dark");
		return isDark ? "dark" : "light";
	});

	useEffect(() => {
		const detectTheme = () => {
			const root = document.documentElement;
			const isDark = root.classList.contains("dark");
			setTheme(isDark ? "dark" : "light");
		};

		detectTheme();

		const observer = new MutationObserver(detectTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	const toggleTheme = () => {
		const event = new CustomEvent("toggle-theme");
		document.dispatchEvent(event);
	};

	return {
		theme,
		isDark: theme === "dark",
		toggleTheme,
	};
}
