import { ThumbsDown, ThumbsUp } from "lucide-react";

interface ChatRatingProps {
	isDark: boolean;
	onRate: (rating: "up" | "down") => void;
}

export function ChatRating({ isDark, onRate }: ChatRatingProps) {
	return (
		<div className="mt-4 flex justify-center">
			<div
				className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs shadow-sm ${
					isDark
						? "border-zinc-800 bg-zinc-900 text-zinc-500"
						: "border-zinc-200 bg-zinc-50 text-zinc-500"
				}`}
			>
				<span>Was this helpful?</span>
				<button
					type="button"
					onClick={() => onRate("up")}
					className={`rounded p-1 ${
						isDark
							? "hover:bg-green-900/30 hover:text-green-600"
							: "hover:bg-green-100 hover:text-green-600"
					}`}
					aria-label="Rate helpful"
				>
					<ThumbsUp size={14} />
				</button>
				<button
					type="button"
					onClick={() => onRate("down")}
					className={`rounded p-1 ${
						isDark
							? "hover:bg-red-900/30 hover:text-red-600"
							: "hover:bg-red-100 hover:text-red-600"
					}`}
					aria-label="Rate not helpful"
				>
					<ThumbsDown size={14} />
				</button>
			</div>
		</div>
	);
}
