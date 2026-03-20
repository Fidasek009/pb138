import { useEffect, useState } from "react";

export interface WidgetProps {
	/** Optional className for styling overrides */
	className?: string;
}

export const Widget = (_props: WidgetProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// Detect theme from parent document
	useEffect(() => {
		const detectTheme = () => {
			const root = window.document.documentElement;
			const isDark =
				root.classList.contains("dark") ||
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			setTheme(isDark ? "dark" : "light");
		};

		detectTheme();

		// Listen for theme changes
		const observer = new MutationObserver(detectTheme);
		observer.observe(window.document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", detectTheme);

		return () => {
			observer.disconnect();
			mediaQuery.removeEventListener("change", detectTheme);
		};
	}, []);

	const isDark = theme === "dark";

	return (
		<div
			className={`${isDark ? "dark" : ""}`}
			style={{
				fontFamily:
					'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			{isOpen && (
				<div
					className={`
						mb-3 w-80 rounded-2xl shadow-2xl overflow-hidden
						${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"}
						border
					`}
				>
					{/* Header */}
					<div
						className={`
							px-4 py-3 border-b
							${isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-100"}
						`}
					>
						<div className="flex items-center gap-3">
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
								style={{ backgroundColor: "#16a34a" }}
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
					</div>

					{/* Chat Area */}
					<div
						className={`h-64 p-4 overflow-y-auto ${
							isDark ? "bg-zinc-950" : "bg-white"
						}`}
					>
						<div className="space-y-4">
							{/* Bot message */}
							<div className="flex justify-start">
								<div
									className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
										isDark
											? "bg-zinc-900 text-zinc-50"
											: "bg-zinc-100 text-zinc-900"
									}`}
								>
									Hi! How can I help you today?
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
								className={`w-full px-4 py-2 pr-10 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 ${
									isDark
										? "bg-zinc-900 border-zinc-800 text-zinc-50 placeholder-zinc-500"
										: "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
								}`}
							/>
							<button
								type="button"
								className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
								style={{ color: "#16a34a" }}
								aria-label="Send message"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<title>Send</title>
									<line x1="22" y1="2" x2="11" y2="13" />
									<polygon points="22 2 15 22 11 13 2 9 22 2" />
								</svg>
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
				onClick={() => setIsOpen(!isOpen)}
				className={`
					w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl
					transition-transform hover:scale-105 active:scale-95
					${isOpen ? "" : "animate-pulse"}
				`}
				style={{ backgroundColor: "#16a34a" }}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				{isOpen ? (
					<span className="text-2xl">×</span>
				) : (
					<svg
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Chat bot</title>
						<rect x="3" y="11" width="18" height="10" rx="2" />
						<circle cx="12" cy="5" r="2" />
						<path d="M12 7v4" />
						<line x1="8" y1="16" x2="8" y2="16" />
						<line x1="16" y1="16" x2="16" y2="16" />
					</svg>
				)}
			</button>
		</div>
	);
};
