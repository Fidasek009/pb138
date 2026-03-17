import {
	Bot,
	Maximize2,
	Minimize2,
	Send,
	ThumbsDown,
	ThumbsUp,
	Trash2,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
	id: string;
	role: "user" | "bot";
	content: string;
};

const STORAGE_KEY = "chatbot_messages";

export function ChatBot() {
	const [isOpen, setIsOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [messages, setMessages] = useState<Message[]>(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch {
				return [
					{ id: "1", role: "bot", content: "Hi! How can I help you today?" },
				];
			}
		}
		return [{ id: "1", role: "bot", content: "Hi! How can I help you today?" }];
	});
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [showRating, setShowRating] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// Persist messages to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
	}, [messages]);

	// Persist rating when shown
	useEffect(() => {
		if (showRating) {
			localStorage.setItem("chatbot_rating_shown", "true");
		}
	}, [showRating]);

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	const handleSend = () => {
		if (!inputValue.trim()) return;

		const userMsg: Message = {
			id: Date.now().toString(),
			role: "user",
			content: inputValue,
		};
		setMessages((prev) => [...prev, userMsg]);
		setInputValue("");
		setIsTyping(true);

		// Simulate bot response
		setTimeout(() => {
			const botMsg: Message = {
				id: (Date.now() + 1).toString(),
				role: "bot",
				content:
					"That's a great question! I'm an AI assistant built to help you navigate our platform and find answers quickly.",
			};
			setMessages((prev) => [...prev, botMsg]);
			setIsTyping(true);
			if (messages.length > 3) setShowRating(true);
		}, 1500);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") handleSend();
	};

	const handleRating = (rating: "up" | "down") => {
		// Store rating
		localStorage.setItem("chatbot_rating_value", rating);
		setShowRating(false);
	};

	const clearChat = () => {
		setMessages([
			{
				id: Date.now().toString(),
				role: "bot",
				content: "Chat reset. How can I help you today?",
			},
		]);
		localStorage.removeItem(STORAGE_KEY);
		localStorage.removeItem("chatbot_rating_shown");
		localStorage.removeItem("chatbot_rating_value");
		setShowRating(false);
	};

	return (
		<div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.2 }}
						className={`mb-4 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800 ${
							isExpanded
								? "h-[80vh] w-[90vw] md:w-[600px]"
								: "h-[500px] w-[350px]"
						}`}
					>
						{/* Header */}
						<div className="flex items-center justify-between border-zinc-100 border-b bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
							<div className="flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16a34a] text-white">
									<Bot size={18} />
								</div>
								<div>
									<h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
										Support Assistant
									</h3>
									<p className="text-green-600 text-xs dark:text-green-500">
										Online
									</p>
								</div>
							</div>
							<div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
								<button
									type="button"
									onClick={clearChat}
									className="rounded-md p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800"
									title="Clear Chat"
								>
									<Trash2 size={16} />
								</button>
								<button
									type="button"
									onClick={() => setIsExpanded(!isExpanded)}
									className="hidden rounded-md p-1.5 hover:bg-zinc-200 md:block dark:hover:bg-zinc-800"
									title={isExpanded ? "Minimize" : "Expand"}
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
									className="rounded-md p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800"
									title="Close"
								>
									<X size={16} />
								</button>
							</div>
						</div>

						{/* Chat Area */}
						<div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-zinc-950">
							<div className="space-y-4">
								{messages.map((msg) => (
									<div
										key={msg.id}
										className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
									>
										<div
											className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
												msg.role === "user"
													? "bg-primary text-primary-foreground"
													: "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
											}`}
										>
											{msg.content}
										</div>
									</div>
								))}
								{isTyping && (
									<div className="flex justify-start">
										<div className="flex max-w-[85%] gap-1 rounded-2xl bg-zinc-100 px-4 py-3 text-sm dark:bg-zinc-900">
											<motion.div
												animate={{ y: [0, -5, 0] }}
												transition={{
													repeat: Infinity,
													duration: 0.6,
													delay: 0,
												}}
												className="h-1.5 w-1.5 rounded-full bg-zinc-400"
											/>
											<motion.div
												animate={{ y: [0, -5, 0] }}
												transition={{
													repeat: Infinity,
													duration: 0.6,
													delay: 0.2,
												}}
												className="h-1.5 w-1.5 rounded-full bg-zinc-400"
											/>
											<motion.div
												animate={{ y: [0, -5, 0] }}
												transition={{
													repeat: Infinity,
													duration: 0.6,
													delay: 0.4,
												}}
												className="h-1.5 w-1.5 rounded-full bg-zinc-400"
											/>
										</div>
									</div>
								)}
								{showRating && !isTyping && (
									<div className="mt-4 flex justify-center">
										<div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
											<span>Was this helpful?</span>
											<button
												type="button"
												onClick={() => handleRating("up")}
												className="rounded p-1 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30"
											>
												<ThumbsUp size={14} />
											</button>
											<button
												type="button"
												onClick={() => handleRating("down")}
												className="rounded p-1 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
											>
												<ThumbsDown size={14} />
											</button>
										</div>
									</div>
								)}
								<div ref={messagesEndRef} />
							</div>
						</div>

						{/* Input Area */}
						<div className="border-zinc-100 border-t bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
							<div className="relative">
								<Input
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Type your message..."
									className="rounded-full border-zinc-200 bg-zinc-50 pr-10 focus-visible:ring-1 dark:border-zinc-800 dark:bg-zinc-900"
								/>
								<Button
									size="icon"
									variant="ghost"
									onClick={handleSend}
									disabled={!inputValue.trim()}
									className="absolute top-1 right-1 h-8 w-8 rounded-full text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
								>
									<Send size={16} />
								</Button>
							</div>
							<div className="mt-2 text-center text-[10px] text-zinc-400">
								Powered by PagePal
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setIsOpen(!isOpen)}
				className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#16a34a] text-white shadow-xl hover:bg-[#16a34a]/90 focus:outline-none focus:ring-4 focus:ring-[#16a34a]/50 focus:ring-offset-2 dark:border-zinc-800"
			>
				{isOpen ? <X size={24} /> : <Bot size={28} />}
			</motion.button>
		</div>
	);
}
