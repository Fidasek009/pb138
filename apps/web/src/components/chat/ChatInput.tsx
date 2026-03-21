import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
	inputValue: string;
	setInputValue: (value: string) => void;
	onSend: () => void;
	isDark: boolean;
}

export function ChatInput({
	inputValue,
	setInputValue,
	onSend,
	isDark,
}: ChatInputProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<div
			className={`border-t p-4 ${
				isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-100 bg-white"
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
					onClick={onSend}
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
	);
}
