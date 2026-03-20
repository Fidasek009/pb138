import { useState } from "react";
import { BotIcon, SendIcon } from "./icons";
import { useWidgetTheme } from "./useWidgetTheme";

export interface WidgetProps {
	/** Optional className for styling overrides */
	className?: string;
}

const BRAND_COLOR = "#16a34a";

export function Widget(_props: WidgetProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { theme, isDark } = useWidgetTheme();

	return (
		<div
			className={theme}
			style={{
				fontFamily:
					'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			{isOpen && (
				<div
					className={`
						mb-3 w-80 rounded-2xl shadow-2xl overflow-hidden border
						${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"}
					`}
				>
					{/* Header */}
					<header
						className={`
							px-4 py-3 border-b
							${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-100"}
						`}
					>
						<div className="flex items-center gap-3">
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
								style={{ backgroundColor: BRAND_COLOR }}
							>
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
								<p className="text-green-600 dark:text-green-500 text-xs">
									Online
								</p>
							</div>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className={`text-lg leading-none px-2 py-1 rounded ${
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
						className={`h-64 p-4 overflow-y-auto ${
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
						className={`p-4 border-t ${
							isDark
								? "bg-zinc-950 border-zinc-800"
								: "bg-white border-zinc-100"
						}`}
					>
						<div className="relative">
							<input
								type="text"
								placeholder="Type your message..."
								aria-label="Type your message"
								className={`w-full px-4 py-2 pr-10 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 ${
									isDark
										? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
										: "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
								}`}
							/>
							<button
								type="button"
								className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
								style={{ color: BRAND_COLOR }}
								aria-label="Send message"
							>
								<SendIcon size={16} />
							</button>
						</div>
						<p
							className={`text-center text-[10px] mt-2 ${
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
				className={`
					w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl
					transition-transform hover:scale-105 active:scale-95
					${isOpen ? "" : "animate-pulse"}
				`}
				style={{ backgroundColor: BRAND_COLOR }}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				{isOpen ? <span className="text-2xl">×</span> : <BotIcon size={28} />}
			</button>
		</div>
	);
}
