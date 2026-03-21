import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constants";
import { ChatFAB } from "./ChatFAB";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatRating } from "./ChatRating";
import { ChatTypingIndicator } from "./ChatTypingIndicator";
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

	const handleRating = useCallback(
		(rating: "up" | "down") => {
			localStorage.setItem(STORAGE_KEYS.CHAT_RATING_VALUE, rating);
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
						<ChatHeader
							isDark={isDark}
							isExpanded={isExpanded}
							toggleTheme={toggleTheme}
							clearMessages={clearMessages}
							toggleExpand={() => setIsExpanded((prev) => !prev)}
							onClose={() => setIsOpen(false)}
						/>

						<div
							className={`flex-1 overflow-y-auto p-4 ${isDark ? "bg-zinc-950" : "bg-white"}`}
						>
							<div className="space-y-4">
								{messages.map((msg) => (
									<ChatMessageBubble
										key={msg.id}
										message={msg}
										isDark={isDark}
									/>
								))}
								{isTyping && <ChatTypingIndicator isDark={isDark} />}
								{showRating && !isTyping && (
									<ChatRating isDark={isDark} onRate={handleRating} />
								)}
								<div ref={messagesEndRef} />
							</div>
						</div>

						<ChatInput
							inputValue={inputValue}
							setInputValue={setInputValue}
							onSend={handleSend}
							isDark={isDark}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<ChatFAB
				isOpen={isOpen}
				isDark={isDark}
				onClick={() => setIsOpen((prev) => !prev)}
			/>
		</div>
	);
}
