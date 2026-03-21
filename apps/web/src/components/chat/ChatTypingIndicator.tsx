import { motion } from "motion/react";

interface ChatTypingIndicatorProps {
	isDark: boolean;
}

export function ChatTypingIndicator({ isDark }: ChatTypingIndicatorProps) {
	return (
		<div className="flex justify-start">
			<div
				className={`flex max-w-[85%] gap-1 rounded-2xl px-4 py-3 text-sm ${isDark ? "bg-zinc-900" : "bg-zinc-100"}`}
			>
				{[0, 0.2, 0.4].map((delay) => (
					<motion.div
						key={delay}
						animate={{ y: [0, -5, 0] }}
						transition={{ repeat: Infinity, duration: 0.6, delay }}
						className="h-1.5 w-1.5 rounded-full bg-zinc-400"
					/>
				))}
			</div>
		</div>
	);
}
