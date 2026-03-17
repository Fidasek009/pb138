import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
	AdminDashboard,
	BackOfficePage,
	LandingPage,
	LoginPage,
	RegisterPage,
	SettingsPage,
} from "@/pages";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <AdminDashboard />,
			},
			{
				path: "settings",
				element: <SettingsPage />,
			},
		],
	},
	{
		path: "/dev/backoffice",
		element: <BackOfficePage />,
	},
]);
