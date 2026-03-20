import { Link } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowLeft,
	BarChart3,
	CheckCircle2,
	Moon,
	Shield,
	Sun,
	Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/lib/useTheme";

export function BackOfficePage() {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
			<header className="flex h-16 items-center gap-4 border-zinc-200 border-b bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
				<Button variant="ghost" size="icon" asChild>
					<Link to="/dashboard">
						<ArrowLeft size={18} />
					</Link>
				</Button>
				<div className="flex flex-1 items-center gap-2">
					<Shield size={20} className="text-red-600 dark:text-red-500" />
					<h1 className="font-semibold text-zinc-900 dark:text-zinc-50">
						Platform Back-office
					</h1>
				</div>
				<button
					type="button"
					onClick={toggleTheme}
					className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
					aria-label={
						theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
					}
				>
					{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
				</button>
			</header>

			<main className="mx-auto max-w-7xl space-y-8 p-8">
				<div>
					<h2 className="font-bold text-2xl text-zinc-900 tracking-tight dark:text-zinc-50">
						Platform Health
					</h2>
					<p className="text-zinc-500 dark:text-zinc-400">
						Aggregated stats and downstream service status.
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card className="overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm dark:text-zinc-100">
								Total Active Tenants
							</CardTitle>
							<Users size={16} className="text-zinc-500 dark:text-zinc-400" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl dark:text-zinc-50">142</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								+12 this week
							</p>
						</CardContent>
					</Card>
					<Card className="overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm dark:text-zinc-100">
								Platform Tokens
							</CardTitle>
							<BarChart3
								size={16}
								className="text-zinc-500 dark:text-zinc-400"
							/>
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl dark:text-zinc-50">1.2M</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Last 30 days
							</p>
						</CardContent>
					</Card>
					<Card className="overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm dark:text-zinc-100">
								OpenAI API
							</CardTitle>
							<CheckCircle2 size={16} className="text-green-500" />
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl text-green-600 dark:text-green-500">
								Operational
							</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Avg response: 1.2s
							</p>
						</CardContent>
					</Card>
					<Card className="overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="font-medium text-sm dark:text-zinc-100">
								Error Rate
							</CardTitle>
							<AlertCircle
								size={16}
								className="text-zinc-500 dark:text-zinc-400"
							/>
						</CardHeader>
						<CardContent>
							<div className="font-bold text-2xl dark:text-zinc-50">0.05%</div>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Within normal limits
							</p>
						</CardContent>
					</Card>
				</div>

				<div>
					<h2 className="mb-4 font-bold text-xl text-zinc-900 tracking-tight dark:text-zinc-50">
						Clients / Tenants
					</h2>
					<Card className="overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
						<div className="overflow-x-auto">
							<table className="w-full text-left text-sm text-zinc-500 dark:text-zinc-400">
								<thead className="border-zinc-200 border-b bg-zinc-50 text-xs text-zinc-700 uppercase dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Client
										</th>
										<th scope="col" className="px-6 py-3">
											Status
										</th>
										<th scope="col" className="px-6 py-3">
											API Type
										</th>
										<th scope="col" className="px-6 py-3">
											Token Usage
										</th>
										<th scope="col" className="px-6 py-3 text-right">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-zinc-200 border-b bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
										<td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
											Acme Corp
										</td>
										<td className="px-6 py-4">
											<Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
												Active
											</Badge>
										</td>
										<td className="px-6 py-4 dark:text-zinc-300">
											Platform Default
										</td>
										<td className="px-6 py-4 dark:text-zinc-300">
											120K / 500K
										</td>
										<td className="space-x-2 px-6 py-4 text-right">
											<Button variant="outline" size="sm">
												Impersonate
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="text-red-600 hover:text-red-700 dark:text-red-500"
											>
												Suspend
											</Button>
										</td>
									</tr>
									<tr className="border-zinc-200 border-b bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
										<td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
											Globex Inc
										</td>
										<td className="px-6 py-4">
											<Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
												Suspended
											</Badge>
										</td>
										<td className="px-6 py-4 dark:text-zinc-300">
											Custom API Key
										</td>
										<td className="px-6 py-4 dark:text-zinc-300">0 / 0</td>
										<td className="space-x-2 px-6 py-4 text-right">
											<Button variant="outline" size="sm">
												Impersonate
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="text-green-600 hover:text-green-700 dark:text-green-500"
											>
												Re-enable
											</Button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Card>
				</div>
			</main>
		</div>
	);
}
