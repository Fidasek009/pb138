import BotIconSvg from "../assets/bot-icon.svg?react";
import SendIconSvg from "../assets/send-icon.svg?react";

interface IconProps {
	size?: number;
}

export function SendIcon({ size = 16 }: IconProps) {
	return <SendIconSvg width={size} height={size} aria-hidden="true" />;
}

export function BotIcon({ size = 28 }: IconProps) {
	return <BotIconSvg width={size} height={size} aria-hidden="true" />;
}
