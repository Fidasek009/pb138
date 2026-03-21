import { useTheme } from "@/lib/useTheme";

export type ChatTheme = "light" | "dark";

interface UseSyncedThemeReturn {
	theme: ChatTheme;
	toggleTheme: () => void;
	isDark: boolean;
}

/**
 * Hook that syncs with the global app theme.
 * The chat widget theme is controlled by the global theme toggle.
 */
export function useSyncedTheme(): UseSyncedThemeReturn {
	const { theme, toggleTheme } = useTheme();

	return {
		theme,
		toggleTheme,
		isDark: theme === "dark",
	};
}
