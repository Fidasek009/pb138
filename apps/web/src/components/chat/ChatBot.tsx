import {
	Bot,
	Maximize2,
	Minimize2,
	Moon,
	Send,
	Sun,
	ThumbsDown,
	ThumbsUp,
	Trash2,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "./useChat";
import { useSyncedTheme } from "./useSyncedTheme";

export function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { theme, toggleTheme, isDark } = useSyncedTheme();
	const {
		messages,
		isTyping,
		showRating,
		sendMessage,
		clearMessages,
		setShowRating,
	} = useChat();

	// Auto-scroll to bottom when messages change
	// biome-ignore lint/correctness/useExhaustiveDependencies: Intentionally scroll on messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = useCallback(() => {
		if (!inputValue.trim()) return;
		sendMessage(inputValue.trim());
		setInputValue("");
	}, [inputValue, sendMessage]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSend();
			}
		},
		[handleSend],
	);

	const handleRating = useCallback(
		(rating: "up" | "down") => {
			localStorage.setItem("chatbot_rating_value", rating);
			setShowRating(false);
		},
		[setShowRating],
	);

	const chatContainerClasses = isDark
		? "bg-zinc-950 ring-zinc-800"
		: "bg-white ring-zinc-200";

	const chatClasses = isExpanded
		? "h-[80vh] w-[90vw] md:w-[600px]"
		: "h-[500px] w-[350px]";

	return (
		<div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.2 }}
						data-theme={theme}
						className={`mb-4 flex flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ${chatContainerClasses} ${chatClasses}`}
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
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16a34a] text-white">
									<Bot size={18} />
								</div>
								<div>
									<h3
										className={`font-semibold text-sm ${isDark ? "text-zinc-50" : "text-zinc-900"}`}
									>
										Support Assistant
									</h3>
									<p className="text-green-600 text-xs dark:text-green-500">
										Online
									</p>
								</div>
							</div>
							<div
								className={`flex items-center gap-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
							>
								<button
									type="button"
									onClick={toggleTheme}
									className={`rounded-md p-1.5 ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
									title={isDark ? "Switch to light" : "Switch to dark"}
									aria-label={
										isDark ? "Switch to light theme" : "Switch to dark theme"
									}
								>
									{isDark ? <Sun size={16} /> : <Moon size={16} />}
								</button>
								<button
									type="button"
									onClick={clearMessages}
									className={`rounded-md p-1.5 ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
									title="Clear Chat"
									aria-label="Clear chat history"
								>
									<Trash2 size={16} />
								</button>
								<button
									type="button"
									onClick={() => setIsExpanded((prev) => !prev)}
									className={`hidden rounded-md p-1.5 md:block ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
									title={isExpanded ? "Minimize" : "Expand"}
									aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
								>
									{isExpanded ? (
										<Minimize2 size={16} />
									) : (
										<Maximize2 size={16} />
									)}
								</button>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
									className={`rounded-md p-1.5 ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
									title="Close"
									aria-label="Close chat"
								>
									<X size={16} />
								</button>
							</div>
						</header>

						{/* Chat Area */}
						<div
							className={`flex-1 overflow-y-auto p-4 ${isDark ? "bg-zinc-950" : "bg-white"}`}
						>
							<div className="space-y-4">
								{messages.map((msg) => (
									<MessageBubble key={msg.id} message={msg} isDark={isDark} />
								))}
								{isTyping && <TypingIndicator isDark={isDark} />}
								{showRating && !isTyping && (
									<Rating
										isDark={isDark}
										onRate={handleRating}
										onDismiss={() => setShowRating(false)}
									/>
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
								<Input
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Type your message..."
									aria-label="Type your message"
									className={`rounded-full pr-10 focus-visible:ring-1 ${
										isDark
											? "border-zinc-800 bg-zinc-800 text-white placeholder:text-zinc-500"
											: "border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-500"
									}`}
								/>
								<Button
									size="icon"
									variant="ghost"
									onClick={handleSend}
									disabled={!inputValue.trim()}
									aria-label="Send message"
									className="absolute top-1 right-1 h-8 w-8 rounded-full text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
								>
									<Send size={16} />
								</Button>
							</div>
							<p className="mt-2 text-center text-[10px] text-zinc-400">
								Powered by PagePal
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<FAB isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
		</div>
	);
}

// Sub-components

interface MessageBubbleProps {
	message: { role: "user" | "bot"; content: string };
	isDark: boolean;
}

function MessageBubble({ message, isDark }: MessageBubbleProps) {
	const isUser = message.role === "user";
	const bubbleClasses = isUser
		? "bg-primary text-primary-foreground"
		: isDark
			? "bg-zinc-900 text-zinc-50"
			: "bg-zinc-100 text-zinc-900";

	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
			<div
				className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${bubbleClasses}`}
			>
				{message.content}
			</div>
		</div>
	);
}

interface TypingIndicatorProps {
	isDark: boolean;
}

function TypingIndicator({ isDark }: TypingIndicatorProps) {
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

interface RatingProps {
	isDark: boolean;
	onRate: (rating: "up" | "down") => void;
	onDismiss: () => void;
}

function Rating({ isDark, onRate }: RatingProps) {
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

interface FABProps {
	isOpen: boolean;
	onClick: () => void;
}

function FAB({ isOpen, onClick }: FABProps) {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			aria-label={isOpen ? "Close chat" : "Open chat"}
			className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#16a34a] text-white shadow-xl hover:bg-[#16a34a]/90 focus:outline-none focus:ring-4 focus:ring-[#16a34a]/50 focus:ring-offset-2 dark:border-zinc-800"
		>
			{isOpen ? <X size={24} /> : <Bot size={28} />}
		</motion.button>
	);
}
