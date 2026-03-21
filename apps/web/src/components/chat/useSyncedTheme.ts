import { useEffect, useState } from "react";

export type ChatTheme = "light" | "dark";

interface UseSyncedThemeReturn {
	theme: ChatTheme;
	toggleTheme: () => void;
	isDark: boolean;
}

/**
 * Hook that syncs with the global app theme via DOM class.
 * The chat widget theme is controlled by the global theme toggle.
 * Uses MutationObserver to react to theme changes from any source.
 */
export function useSyncedTheme(): UseSyncedThemeReturn {
	const [isDark, setIsDark] = useState(() => {
		if (typeof document === "undefined") return false;
		return document.documentElement.classList.contains("dark");
	});

	useEffect(() => {
		const detectTheme = () => {
			const hasDarkClass = document.documentElement.classList.contains("dark");
			setIsDark(hasDarkClass);
		};

		// Set initial value
		detectTheme();

		// Watch for changes to the dark class on documentElement
		const observer = new MutationObserver(detectTheme);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	// Toggle theme by dispatching a custom event the main app listens to
	// Falls back to directly toggling the class
	const toggleTheme = () => {
		const event = new CustomEvent("toggle-theme");
		document.dispatchEvent(event);
	};

	return {
		theme: isDark ? "dark" : "light",
		toggleTheme,
		isDark,
	};
}
