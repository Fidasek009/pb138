import { getToolColorClasses } from "@/lib/colors";

interface ToolIconProps {
	color: string;
	icon: string;
	size?: "sm" | "md";
}

export function ToolIcon({ color, icon, size = "sm" }: ToolIconProps) {
	const { bg, text } = getToolColorClasses(color);
	const sizeClasses =
		size === "md" ? "h-10 w-10 rounded-lg" : "h-8 w-8 rounded-md";

	return (
		<div className={`flex ${sizeClasses} items-center justify-center ${bg}`}>
			<span className={`font-medium text-sm ${text}`}>{icon}</span>
		</div>
	);
}
