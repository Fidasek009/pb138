import { useState } from "react";
import { BotIcon, SendIcon } from "./icons";
import { useWidgetTheme } from "./useWidgetTheme";

export interface WidgetProps {
	/** Optional className for styling overrides */
	className?: string;
}

export function Widget(props: WidgetProps) {
	const { className } = props;
	const [isOpen, setIsOpen] = useState(false);
	const { theme, isDark } = useWidgetTheme();

	return (
		<div
			className={[theme, className].filter(Boolean).join(" ")}
			style={{
				fontFamily:
					'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			{isOpen && (
				<div
					className={`mb-3 w-80 overflow-hidden rounded-2xl shadow-2xl border ${isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"}
					`}
				>
					{/* Header */}
					<header
						className={`px-4 py-3 border-b ${isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-zinc-50"}
						`}
					>
						<div className="flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
								AI
							</div>
							<div className="flex-1">
								<h3
									className={`font-semibold text-sm ${
										isDark ? "text-zinc-50" : "text-zinc-900"
									}`}
								>
									Support Assistant
								</h3>
								<p className="text-green-600 text-xs dark:text-green-500">
									Online
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className={`rounded px-2 py-1 text-lg leading-none ${
									isDark
										? "text-zinc-400 hover:bg-zinc-800"
										: "text-zinc-500 hover:bg-zinc-200"
								}`}
								aria-label="Close chat"
							>
								×
							</button>
						</div>
					</header>

					{/* Chat Area */}
					<div
						className={`h-64 overflow-y-auto p-4 ${
							isDark ? "bg-zinc-950" : "bg-white"
						}`}
					>
						<div className="space-y-4" role="log" aria-live="polite">
							{/* Bot message */}
							<div className="flex justify-start">
								<div
									className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
										isDark
											? "bg-zinc-800 text-zinc-50"
											: "bg-zinc-100 text-zinc-900"
									}`}
								>
									Hi! How can I help you today?
								</div>
							</div>
							{/* User message example */}
							<div className="flex justify-end">
								<div
									className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
										isDark
											? "bg-green-700 text-white"
											: "bg-green-600 text-white"
									}`}
								>
									I have a question about pricing.
								</div>
							</div>
						</div>
					</div>

					{/* Input Area */}
					<div
						className={`border-t p-4 ${
							isDark
								? "border-zinc-800 bg-zinc-950"
								: "border-zinc-100 bg-white"
						}`}
					>
						<div className="relative">
							<input
								type="text"
								placeholder="Type your message..."
								aria-label="Type your message"
								className={`w-full rounded-full border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
									isDark
										? "border-zinc-700 bg-zinc-800 text-white placeholder-zinc-400"
										: "border-zinc-200 bg-zinc-50 text-zinc-900 placeholder-zinc-400"
								}`}
							/>
							<button
								type="button"
								className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-green-600"
								aria-label="Send message"
							>
								<SendIcon size={16} />
							</button>
						</div>
						<p
							className={`mt-2 text-center text-[10px] ${
								isDark ? "text-zinc-500" : "text-zinc-400"
							}`}
						>
							Powered by PagePal
						</p>
					</div>
				</div>
			)}

			{/* Toggle Button */}
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className={`flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${isOpen ? "" : "animate-pulse"}
				`}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				{isOpen ? <span className="text-2xl">×</span> : <BotIcon size={28} />}
			</button>
		</div>
	);
}
