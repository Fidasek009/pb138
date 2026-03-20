export type MessageRole = "user" | "bot";

export interface Message {
	id: string;
	role: MessageRole;
	content: string;
}

export interface ChatState {
	messages: Message[];
	isTyping: boolean;
	showRating: boolean;
	inputValue: string;
}
