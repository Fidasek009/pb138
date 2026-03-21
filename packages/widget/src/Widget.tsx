import { useCallback, useEffect, useRef, useState } from "react";
import { BotIcon, SendIcon } from "./icons";
import { useWidgetTheme } from "./useWidgetTheme";

export interface WidgetProps {
	/** Optional className for styling overrides - use for positioning like "left-6 right-auto" */
	className?: string;
}

interface Message {
	id: string;
	role: "user" | "bot";
	content: string;
}

export function Widget(props: WidgetProps) {
	const { className } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "welcome",
			role: "bot",
			content: "Hi! How can I help you today?",
		},
	]);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { theme, toggleTheme, isDark } = useWidgetTheme();

	// Auto-scroll to bottom
	// biome-ignore lint/correctness/useExhaustiveDependencies: Intentionally scroll on messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = useCallback(() => {
		if (!inputValue.trim()) return;

		const userMsg: Message = {
			id: Date.now().toString(),
			role: "user",
			content: inputValue.trim(),
		};
		setMessages((prev) => [...prev, userMsg]);
		setInputValue("");
		setIsTyping(true);

		// Simulate bot response
		setTimeout(() => {
			const botMsg: Message = {
				id: (Date.now() + 1).toString(),
				role: "bot",
				content: "Thanks for your message! Our team will get back to you soon.",
			};
			setMessages((prev) => [...prev, botMsg]);
			setIsTyping(false);
		}, 1500);
	}, [inputValue]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const clearMessages = () => {
		setMessages([
			{
				id: "welcome",
				role: "bot",
				content: "Hi! How can I help you today?",
			},
		]);
	};

	const chatContainerClasses = isDark
		? "bg-zinc-950 ring-zinc-800"
		: "bg-white ring-zinc-200";

	return (
		<div
			className={[
				"fixed right-6 bottom-6 z-50 flex flex-col items-end",
				theme,
				className,
			]
				.filter(Boolean)
				.join(" ")}
			style={{
				fontFamily:
					'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
			}}
		>
			{isOpen && (
				<div
					className={`mb-3 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ${chatContainerClasses}`}
				>
					{/* Header */}
					<header
						className={`flex items-center justify-between border-b px-4 py-3 ${
							isDark
								? "border-zinc-800 bg-zinc-900"
								: "border-zinc-100 bg-zinc-50"
						}`}
					>
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
								<BotIcon size={18} />
							</div>
							<div>
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
						</div>
						<div
							className={`flex items-center gap-1 ${
								isDark ? "text-zinc-400" : "text-zinc-500"
							}`}
						>
							{/* Clear/Reset Button */}
							<button
								type="button"
								onClick={clearMessages}
								className={`rounded-md p-1.5 ${
									isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
								}`}
								title="Clear chat"
								aria-label="Clear chat history"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<title>Clear icon</title>
									<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								</svg>
							</button>
							{/* Theme Toggle */}
							<button
								type="button"
								onClick={toggleTheme}
								className={`rounded-md p-1.5 ${
									isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
								}`}
								title={isDark ? "Switch to light" : "Switch to dark"}
								aria-label={
									isDark ? "Switch to light theme" : "Switch to dark theme"
								}
							>
								{isDark ? (
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<title>Sun icon</title>
										<circle cx="12" cy="12" r="5" />
										<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
									</svg>
								) : (
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<title>Moon icon</title>
										<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
									</svg>
								)}
							</button>
							{/* Close Button */}
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className={`rounded-md p-1.5 ${
									isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
								}`}
								title="Close chat"
								aria-label="Close chat"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									aria-hidden="true"
								>
									<title>Close icon</title>
									<path d="M18 6 6 18M6 6l12 12" />
								</svg>
							</button>
						</div>
					</header>

					{/* Chat Area */}
					<div
						className={`flex-1 overflow-y-auto p-4 ${
							isDark ? "bg-zinc-950" : "bg-white"
						}`}
					>
						<div className="space-y-4">
							{messages.map((msg) => (
								<div
									key={msg.id}
									className={`flex ${
										msg.role === "user" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
											msg.role === "user"
												? "bg-primary text-primary-foreground"
												: isDark
													? "bg-zinc-900 text-zinc-50"
													: "bg-zinc-100 text-zinc-900"
										}`}
									>
										{msg.content}
									</div>
								</div>
							))}
							{isTyping && (
								<div className="flex justify-start">
									<div
										className={`flex max-w-[85%] gap-1 rounded-2xl px-4 py-3 ${
											isDark ? "bg-zinc-900" : "bg-zinc-100"
										}`}
									>
										{[0, 1, 2].map((i) => (
											<div
												key={i}
												className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
												style={{ animationDelay: `${i * 0.15}s` }}
											/>
										))}
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
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
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Type your message..."
								aria-label="Type your message"
								className={`w-full rounded-full border px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
									isDark
										? "border-zinc-800 bg-zinc-800 text-white placeholder:text-zinc-500"
										: "border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-500"
								}`}
							/>
							<button
								type="button"
								onClick={handleSend}
								disabled={!inputValue.trim()}
								className="absolute top-1/2 right-3 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
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
				className={`flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${
					isOpen ? "" : "animate-pulse"
				}`}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				{isOpen ? (
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<title>Close icon</title>
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				) : (
					<BotIcon size={28} />
				)}
			</button>
		</div>
	);
}
