import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ChatBot } from "@/components/ChatBot";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<ChatBot />
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</>
	),
});
