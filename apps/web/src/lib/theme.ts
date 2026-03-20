/**
 * Theme configuration constants for the application.
 *
 * This file centralizes all color definitions that are used
 * across multiple components. For Tailwind CSS utility classes,
 * we use CSS custom properties defined in index.css.
 *
 * This file is for runtime JavaScript/TypeScript constants
 * that need to be shared across components.
 */

/** Primary brand color - Green */
export const COLORS = {
	/** Primary green brand color */
	primary: "#16a34a",
	/** Primary hover state - 90% opacity */
	primaryHover: "rgba(22, 163, 74, 0.9)",
	/** Primary with opacity for backgrounds */
	primaryLight: "#f0fdf4",

	/** Zinc color scale for UI grays */
	zinc: {
		50: "#fafafa",
		100: "#f4f4f5",
		200: "#e4e4e7",
		300: "#d4d4d8",
		400: "#a1a1aa",
		500: "#71717a",
		600: "#52525b",
		700: "#3f3f46",
		800: "#27272a",
		900: "#18181b",
		950: "#09090b",
	},

	/** Semantic colors */
	destructive: "#ef4444",
	destructiveDark: "#7f1d1d",

	/** Chart colors */
	chart: {
		1: "#16a34a",
		2: "#22c55e",
		3: "#4ade80",
		4: "#86efac",
		5: "#bbf7d0",
	},

	/** Feature icon colors with light/dark variants */
	features: {
		blue: {
			bg: "bg-blue-500/20",
			bgDark: "dark:bg-blue-500/40",
			text: "text-blue-700",
			textDark: "dark:text-blue-300",
		},
		green: {
			bg: "bg-green-500/20",
			bgDark: "dark:bg-green-500/40",
			text: "text-green-700",
			textDark: "dark:text-green-300",
		},
		purple: {
			bg: "bg-purple-500/20",
			bgDark: "dark:bg-purple-500/40",
			text: "text-purple-700",
			textDark: "dark:text-purple-300",
		},
	},
} as const;

/** Border radius values */
export const RADIUS = {
	sm: "0.25rem",
	md: "0.5rem",
	lg: "0.75rem",
	xl: "1rem",
	full: "9999px",
} as const;

/** Animation durations */
export const DURATIONS = {
	fast: "150ms",
	normal: "200ms",
	slow: "300ms",
} as const;

/** Shadow presets */
export const SHADOWS = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
} as const;
