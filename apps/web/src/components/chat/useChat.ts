import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULTS, STORAGE_KEYS, UI } from "@/lib/constants";
import type { Message } from "./types";

const STORAGE_KEY = STORAGE_KEYS.CHAT_MESSAGES;

interface UseChatOptions {
	initialMessage?: string;
}

interface UseChatReturn {
	messages: Message[];
	isTyping: boolean;
	showRating: boolean;
	addMessage: (content: string, role: "user" | "bot") => void;
	sendMessage: (content: string) => void;
	clearMessages: () => void;
	setShowRating: (show: boolean) => void;
}

function generateId(): string {
	return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function loadMessages(): Message[] {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved) {
		try {
			return JSON.parse(saved);
		} catch {
			// Fall through to default
		}
	}
	return [];
}

function saveMessages(messages: Message[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
	const { initialMessage = DEFAULTS.CHAT_INITIAL_MESSAGE } = options;

	const [messages, setMessages] = useState<Message[]>(() => {
		const saved = loadMessages();
		return saved.length > 0
			? saved
			: [{ id: generateId(), role: "bot", content: initialMessage }];
	});
	const [isTyping, setIsTyping] = useState(false);
	const [showRating, setShowRating] = useState(() => {
		return localStorage.getItem(STORAGE_KEYS.CHAT_RATING_SHOWN) === "true";
	});

	const responseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Persist messages to localStorage and show rating after N messages
	useEffect(() => {
		saveMessages(messages);
		if (messages.length > UI.CHAT_MAX_MESSAGES_BEFORE_RATING && !isTyping) {
			setShowRating(true);
		}
	}, [messages, isTyping]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (responseTimeoutRef.current) {
				clearTimeout(responseTimeoutRef.current);
			}
		};
	}, []);

	const addMessage = useCallback((content: string, role: "user" | "bot") => {
		const newMessage: Message = {
			id: generateId(),
			role,
			content,
		};
		setMessages((prev) => [...prev, newMessage]);
	}, []);

	const sendMessage = useCallback(
		(content: string) => {
			if (!content.trim()) return;

			// Add user message immediately
			addMessage(content.trim(), "user");

			// Simulate bot typing
			setIsTyping(true);

			// Simulate bot response
			responseTimeoutRef.current = setTimeout(() => {
				addMessage(
					"That's a great question! I'm an AI assistant built to help you navigate our platform and find answers quickly.",
					"bot",
				);
				setIsTyping(false);
			}, 1500);
		},
		[addMessage],
	);

	const clearMessages = useCallback(() => {
		setMessages([
			{
				id: generateId(),
				role: "bot",
				content: "Chat reset. How can I help you today?",
			},
		]);
		setShowRating(false);
		localStorage.removeItem("chatbot_rating_shown");
		localStorage.removeItem("chatbot_rating_value");
	}, []);

	return {
		messages,
		isTyping,
		showRating,
		addMessage,
		sendMessage,
		clearMessages,
		setShowRating,
	};
}
