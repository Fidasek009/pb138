import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { PageContainer } from "@/components/layout";
import { ToolAnimation, ToolCard, UsedToolItem } from "@/components/tools";
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
import {
	DEFAULT_USED_TOOLS,
	generateToolId,
	PRECONFIGURED_TOOLS,
	type Tool,
} from "@/data/tools";
import { useAnimationTimeout } from "@/hooks";

export function SettingsPage() {
	const [movingTool, setMovingTool] = useState<{
		id: string;
		icon: string;
		startX: number;
		startY: number;
	} | null>(null);
	const [usedTools, setUsedTools] = useState<Tool[]>(DEFAULT_USED_TOOLS);

	const { setAnimationTimeout, clearAnimationTimeout } = useAnimationTimeout();

	const isToolAdded = useCallback(
		(toolId: string) => usedTools.some((t) => t.id === toolId),
		[usedTools],
	);

	const handleAddTool = useCallback(
		(tool: Tool, event: React.MouseEvent) => {
			if (isToolAdded(tool.id)) {
				return;
			}

			// Clear any existing animation timeout
			clearAnimationTimeout();

			const rect = event.currentTarget.getBoundingClientRect();
			const startX = rect.left + rect.width / 2;
			const startY = rect.top + rect.height / 2;

			setMovingTool({
				id: tool.id,
				icon: tool.icon,
				startX,
				startY,
			});

			setAnimationTimeout(() => {
				setUsedTools((prev) => [...prev, { ...tool, id: generateToolId() }]);
				setMovingTool(null);
			}, 1000);
		},
		[clearAnimationTimeout, setAnimationTimeout, isToolAdded],
	);

	return (
		<PageContainer>
			<div>
				<h2 className="font-bold text-2xl text-foreground tracking-tight">
					Settings
				</h2>
				<p className="text-muted-foreground">
					Manage your bot&apos;s behavior, integrations, and billing.
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
							<hr className="border-border my-4 border-t-2" />
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
								Connect MCP servers to extend your bot&apos;s capabilities.
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
											<UsedToolItem key={tool.id} tool={tool} />
										))}
									</AnimatePresence>
								</div>
							</div>

							<div>
								<h3 className="mb-3 font-medium text-sm">
									Pre-configured Tools
								</h3>
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
									{PRECONFIGURED_TOOLS.map((tool) => (
										<ToolCard
											key={tool.id}
											tool={tool}
											isAdded={isToolAdded(tool.id)}
											onAdd={handleAddTool}
										/>
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
									<ToolAnimation
										icon={movingTool.icon}
										startX={movingTool.startX}
										startY={movingTool.startY}
										onComplete={() => setMovingTool(null)}
									/>
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
								<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 transition-opacity hover:opacity-20" />
								<span className="relative">pls give money 💸</span>
							</Button>
							<Button className="border-2 border-primary text-primary-foreground hover:border-primary/80">
								Save Settings
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</PageContainer>
	);
}
