import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ChatBot } from "@/components/ChatBot";
import { ErrorBoundary } from "@/components/error";

export const Route = createRootRoute({
	component: () => (
		<ErrorBoundary>
			<Outlet />
			<ChatBot />
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</ErrorBoundary>
	),
});
