import { Bot, Maximize2, Minimize2, Moon, Sun, Trash2, X } from "lucide-react";

interface ChatHeaderProps {
	isDark: boolean;
	isExpanded: boolean;
	toggleTheme: () => void;
	clearMessages: () => void;
	toggleExpand: () => void;
	onClose: () => void;
}

export function ChatHeader({
	isDark,
	isExpanded,
	toggleTheme,
	clearMessages,
	toggleExpand,
	onClose,
}: ChatHeaderProps) {
	return (
		<header
			className={`flex items-center justify-between border-b px-4 py-3 ${
				isDark ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-zinc-50"
			}`}
		>
			<div className="flex items-center gap-2">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
					<Bot size={18} aria-hidden="true" />
				</div>
				<div>
					<h3
						className={`font-semibold text-sm ${isDark ? "text-zinc-50" : "text-zinc-900"}`}
					>
						Support Assistant
					</h3>
					<p className="text-green-600 text-xs dark:text-green-500">Online</p>
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
					aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
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
					onClick={toggleExpand}
					className={`hidden rounded-md p-1.5 md:block ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
					title={isExpanded ? "Minimize" : "Expand"}
					aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
				>
					{isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
				</button>
				<button
					type="button"
					onClick={onClose}
					className={`rounded-md p-1.5 ${isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"}`}
					title="Close"
					aria-label="Close chat"
				>
					<X size={16} />
				</button>
			</div>
		</header>
	);
}
