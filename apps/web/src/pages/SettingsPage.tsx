import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function SettingsPage() {
	const [movingTool, setMovingTool] = useState<{
		id: string;
		icon: string;
		startX: number;
		startY: number;
	} | null>(null);
	const [usedTools, setUsedTools] = useState<
		Array<{
			id: string;
			sourceId: string;
			name: string;
			color: string;
			icon: string;
		}>
	>([
		{
			id: "1",
			sourceId: "1",
			name: "Product Database",
			color: "blue",
			icon: "DB",
		},
		{
			id: "2",
			sourceId: "2",
			name: "Custom Knowledge Base",
			color: "green",
			icon: "JSON",
		},
		{
			id: "3",
			sourceId: "3",
			name: "Internet Search",
			color: "purple",
			icon: "WEB",
		},
	]);

	const handleAddTool = (
		tool: { id: string; name: string; color: string; icon: string },
		event: React.MouseEvent,
	) => {
		// Check if tool already exists
		if (isToolAdded(tool.id)) {
			return;
		}

		const rect = event.currentTarget.getBoundingClientRect();
		const startX = rect.left + rect.width / 2;
		const startY = rect.top + rect.height / 2;

		setMovingTool({
			id: tool.id,
			icon: tool.icon,
			startX,
			startY,
		});

		setTimeout(() => {
			setUsedTools((prev) => [
				...prev,
				{ ...tool, sourceId: tool.id, id: crypto.randomUUID() },
			]);
			setMovingTool(null);
		}, 1000);
	};

	const preconfiguredTools = [
		{
			id: "cal",
			name: "Calendar",
			description: "Schedule management",
			color: "yellow",
			icon: "CAL",
		},
		{
			id: "doc",
			name: "Document Search",
			description: "File content search",
			color: "red",
			icon: "DOC",
		},
		{
			id: "sql",
			name: "SQL Database",
			description: "Database queries",
			color: "green",
			icon: "SQL",
		},
		{
			id: "api",
			name: "REST API",
			description: "Custom API endpoints",
			color: "blue",
			icon: "API",
		},
	];

	const isToolAdded = (toolId: string) => {
		return usedTools.some((tool) => tool.sourceId === toolId);
	};

	return (
		<div className="mx-auto max-w-5xl space-y-6 px-4">
			<div>
				<h2 className="font-bold text-2xl text-foreground tracking-tight">
					Settings
				</h2>
				<p className="text-muted-foreground">
					Manage your bot's behavior, integrations, and billing.
				</p>
			</div>

			<Tabs defaultValue="bot" className="w-full">
				<TabsList className="mb-4 flex-wrap gap-2">
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="bot">Bot Configuration</TabsTrigger>
					<TabsTrigger value="tools">Tools (MCP)</TabsTrigger>
					<TabsTrigger value="billing">Usage & Billing</TabsTrigger>
				</TabsList>

				<TabsContent value="account">
					<Card>
						<CardHeader>
							<CardTitle>Account Details</CardTitle>
							<CardDescription>Update your email and password.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="account-email">Email</Label>
								<Input id="account-email" defaultValue="admin@acme.com" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="account-api-key">API Key</Label>
								<div className="flex gap-2">
									<Input
										id="account-api-key"
										type="password"
										defaultValue="sk-...xxxxxxxxxxxx"
										readOnly
										className="flex-1"
									/>
									<Button variant="outline" size="sm">
										Copy
									</Button>
									<Button variant="outline" size="sm">
										Regenerate
									</Button>
								</div>
								<p className="text-muted-foreground text-sm">
									Use this key to authenticate API requests.
								</p>
							</div>
							<hr className="border-border" />
							<div className="space-y-2">
								<Label htmlFor="current-password">Current Password</Label>
								<Input id="current-password" type="password" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="new-password">New Password</Label>
								<Input id="new-password" type="password" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm New Password</Label>
								<Input id="confirm-password" type="password" />
							</div>
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button className="border-2 border-primary text-primary-foreground hover:border-primary/80">
								Change Password
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="bot">
					<Card className="mb-4">
						<CardHeader>
							<CardTitle>Bot Personality & Rules</CardTitle>
							<CardDescription>
								Configure how your AI responds to users.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="bot-prompt">Context</Label>
								<Textarea
									id="bot-prompt"
									className="min-h-[160px]"
									placeholder="Define the behavior and context for your AI assistant..."
								/>
								<p className="text-muted-foreground text-sm">
									Configure how your AI should respond to users.
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="bot-blacklist">
									Word Blacklist (comma separated)
								</Label>
								<Textarea
									id="bot-blacklist"
									placeholder="competitor-name, swear-word"
									className="min-h-[80px] resize-y"
								/>
								<p className="text-muted-foreground text-sm">
									Expands if the list gets too long.
								</p>
							</div>
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button className="border-2 border-primary text-primary-foreground hover:border-primary/80">
								Save Configuration
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="tools">
					<Card>
						<CardHeader>
							<CardTitle>Tools (MCP)</CardTitle>
							<CardDescription>
								Connect MCP servers to extend your bot's capabilities.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<h3 className="mb-3 font-medium text-sm">
									Currently Used Tools
								</h3>
								<div className="overflow-hidden rounded-lg border border-border">
									<AnimatePresence>
										{usedTools.map((tool) => (
											<motion.div
												key={tool.id}
												layout
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												className="flex items-center justify-between border-border border-b p-4 last:border-b-0"
											>
												<div className="flex items-center gap-3">
													<div
														className={`flex h-8 w-8 items-center justify-center rounded-md ${tool.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : tool.color === "green" ? "bg-green-100 dark:bg-green-900/30" : tool.color === "purple" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}`}
													>
														<span
															className={`font-medium text-sm ${tool.color === "blue" ? "text-blue-600 dark:text-blue-400" : tool.color === "green" ? "text-green-600 dark:text-green-400" : tool.color === "purple" ? "text-purple-600 dark:text-purple-400" : "text-yellow-600 dark:text-yellow-400"}`}
														>
															{tool.icon}
														</span>
													</div>
													<div>
														<p className="font-medium">{tool.name}</p>
														<p className="text-muted-foreground text-sm">
															{tool.name.includes("Database")
																? "Read-only connector"
																: tool.name.includes("Knowledge")
																	? "Static fallback info"
																	: tool.name.includes("Search")
																		? "Web search capabilities"
																		: "Tool connector"}
														</p>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<Button
														size="sm"
														className="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
													>
														Configure
													</Button>
												</div>
											</motion.div>
										))}
									</AnimatePresence>
								</div>
							</div>

							<div>
								<h3 className="mb-3 font-medium text-sm">
									Pre-configured Tools
								</h3>
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
									{preconfiguredTools.map((tool) => (
										<motion.div
											key={tool.id}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="cursor-pointer rounded-lg border border-border p-4 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
											onClick={(e) => handleAddTool(tool, e)}
										>
											<div className="mb-2 flex items-center justify-between">
												<div
													className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : tool.color === "green" ? "bg-green-100 dark:bg-green-900/30" : tool.color === "red" ? "bg-red-100 dark:bg-red-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"}`}
												>
													<span
														className={`font-medium text-sm ${tool.color === "blue" ? "text-blue-600 dark:text-blue-400" : tool.color === "green" ? "text-green-600 dark:text-green-400" : tool.color === "red" ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"}`}
													>
														{tool.icon}
													</span>
												</div>
												<Button
													size="sm"
													className="bg-[#16a34a] text-white hover:bg-[#16a34a]/90"
													onClick={(e) => {
														e.stopPropagation();
														handleAddTool(tool, e);
													}}
													disabled={isToolAdded(tool.id)}
												>
													{isToolAdded(tool.id) ? "Added" : "+ Add"}
												</Button>
											</div>
											<p className="font-medium">{tool.name}</p>
											<p className="text-muted-foreground text-sm">
												{tool.description}
											</p>
										</motion.div>
									))}
								</div>
							</div>

							<div className="pt-2">
								<Button variant="outline" className="w-full" asChild>
									<a
										href="https://modelcontextprotocol.io/servers"
										target="_blank"
										rel="noopener noreferrer"
									>
										See More MCP Servers →
									</a>
								</Button>
								<p className="mt-2 text-center text-muted-foreground text-sm">
									Browse the official MCP server directory
								</p>
							</div>

							{/* Flying tool animation */}
							<AnimatePresence>
								{movingTool && (
									<motion.div
										key="flying-tool"
										initial={{
											scale: 1,
											opacity: 1,
											x: 0,
											y: 0,
											left: `${movingTool.startX}px`,
											top: `${movingTool.startY}px`,
										}}
										animate={{
											scale: [1, 1.3, 0.7],
											opacity: [1, 0.9, 0],
											x: [0, -150, -300],
											y: [0, -100, -200],
										}}
										transition={{
											duration: 1,
											ease: "easeInOut",
										}}
										className="pointer-events-none fixed z-50"
									>
										<motion.div
											animate={{
												rotate: [0, 180, 360],
											}}
											transition={{
												duration: 0.6,
												ease: "linear",
												repeat: Infinity,
											}}
											className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-green-600 shadow-lg"
										>
											<span className="font-bold text-white text-xs">
												{movingTool.icon}
											</span>
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button className="border-2 border-primary text-primary-foreground hover:border-primary/80">
								Save Tool Configuration
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="billing">
					<Card>
						<CardHeader>
							<CardTitle>Usage & Limits</CardTitle>
							<CardDescription>
								Manage your API spend and notifications.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="monthly-limit">Monthly Limit (USD)</Label>
								<Input id="monthly-limit" type="number" defaultValue={50} />
							</div>
							<div className="flex items-center justify-between space-x-2 pt-2">
								<div>
									<Label>Usage Alerts</Label>
									<p className="text-muted-foreground text-sm">
										Email me when reaching 80% of limit
									</p>
								</div>
								<Switch defaultChecked />
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button
								variant="outline"
								className="relative overflow-hidden border-2 border-primary hover:border-primary/80"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 transition-opacity hover:opacity-20"></div>
								<span className="relative">pls give money 💸</span>
							</Button>
							<Button className="border-2 border-primary text-primary-foreground hover:border-primary/80">
								Save Settings
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
