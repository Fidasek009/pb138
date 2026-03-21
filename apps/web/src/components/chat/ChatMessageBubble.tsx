import type { Message } from "./types";

interface ChatMessageBubbleProps {
	message: Message;
	isDark: boolean;
}

export function ChatMessageBubble({ message, isDark }: ChatMessageBubbleProps) {
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
