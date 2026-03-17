import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ChatBot } from "@/components/ChatBot";
import { router } from "@/routes";
import "./index.css";

// Initialize theme on load
if (typeof window !== "undefined") {
	const savedTheme = localStorage.getItem("theme") || "light";
	if (savedTheme === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
}

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
		<ChatBot />
	</StrictMode>,
);
