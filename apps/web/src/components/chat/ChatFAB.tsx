import { Bot, X } from "lucide-react";
import { motion } from "motion/react";

interface ChatFABProps {
	isOpen: boolean;
	isDark: boolean;
	onClick: () => void;
}

export function ChatFAB({ isOpen, isDark, onClick }: ChatFABProps) {
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			aria-label={isOpen ? "Close chat" : "Open chat"}
			className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-primary text-white shadow-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-offset-2 ${isDark ? "border-transparent" : "border-white"}`}
		>
			{isOpen ? <X size={24} /> : <Bot size={28} />}
		</motion.button>
	);
}
