import { useCallback, useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { BotIcon, XLargeIcon } from "./icons";
import { useWidgetTheme } from "./useWidgetTheme";
import "./Widget.css";

export interface WidgetProps {
	/** Optional className for styling overrides - use for positioning like "left-6 right-auto" */
	className?: string;
	/** Position of the widget - affects send button placement. "right" (default) puts button on left, "left" puts button on right */
	position?: "left" | "right";
}

interface Message {
	id: string;
	role: "user" | "bot";
	content: string;
}

export function Widget(props: WidgetProps) {
	const { className, position = "right" } = props;
	const isRightPosition = position === "right";
	const [isOpen, setIsOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
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
	const { theme, isDark } = useWidgetTheme();

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
			if (!inputValue.trim()) return;
			handleSend();
		}
	};

	const toggleExpanded = () => {
		setIsExpanded((prev) => !prev);
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
					className={`mb-3 flex ${isExpanded ? "h-[80vh]" : "h-[500px]"} w-[350px] flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 transition-all duration-300 ${chatContainerClasses}`}
				>
					<ChatHeader
						isDark={isDark}
						isExpanded={isExpanded}
						onClear={clearMessages}
						onToggleExpand={toggleExpanded}
						onClose={() => setIsOpen(false)}
					/>

					<ChatMessageList
						messages={messages}
						isTyping={isTyping}
						isDark={isDark}
						messagesEndRef={messagesEndRef}
					/>

					<ChatInput
						inputValue={inputValue}
						isDark={isDark}
						isRightPosition={isRightPosition}
						onInputChange={setInputValue}
						onSend={handleSend}
						onKeyDown={handleKeyDown}
					/>
				</div>
			)}

			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className={`flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${
					isOpen ? "" : "animate-pulse"
				}`}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				{isOpen ? <XLargeIcon /> : <BotIcon size={28} />}
			</button>
		</div>
	);
}
