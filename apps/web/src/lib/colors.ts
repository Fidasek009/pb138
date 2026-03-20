/**
 * Centralized color utilities for consistent theming
 * Replaces hardcoded color strings across the app
 */

export type ToolColor = "blue" | "green" | "purple" | "red" | "yellow";

export const BRAND_COLORS = {
	primary: "#16a34a",
	primaryHover: "rgba(22, 163, 74, 0.9)",
	primaryDark: "#15803d",
} as const;

export const TOOL_COLOR_STYLES: Record<string, { bg: string; text: string }> = {
	blue: {
		bg: "bg-blue-100 dark:bg-blue-900/30",
		text: "text-blue-600 dark:text-blue-400",
	},
	green: {
		bg: "bg-green-100 dark:bg-green-900/30",
		text: "text-green-600 dark:text-green-400",
	},
	purple: {
		bg: "bg-purple-100 dark:bg-purple-900/30",
		text: "text-purple-600 dark:text-purple-400",
	},
	red: {
		bg: "bg-red-100 dark:bg-red-900/30",
		text: "text-red-600 dark:text-red-400",
	},
	yellow: {
		bg: "bg-yellow-100 dark:bg-yellow-900/30",
		text: "text-yellow-600 dark:text-yellow-400",
	},
};

export function getToolColorClasses(color: string): {
	bg: string;
	text: string;
} {
	return (
		TOOL_COLOR_STYLES[color] ?? {
			bg: "bg-zinc-100 dark:bg-zinc-900/30",
			text: "text-zinc-600 dark:text-zinc-400",
		}
	);
}
