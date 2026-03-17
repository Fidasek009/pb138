import { Bot, CreditCard, DollarSign, MessageSquare, Zap } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const data = [
	{ name: "Mon", tokens: 4000, questions: 240 },
	{ name: "Tue", tokens: 3000, questions: 139 },
	{ name: "Wed", tokens: 2000, questions: 980 },
	{ name: "Thu", tokens: 2780, questions: 390 },
	{ name: "Fri", tokens: 1890, questions: 480 },
	{ name: "Sat", tokens: 2390, questions: 380 },
	{ name: "Sun", tokens: 3490, questions: 430 },
];

export function AdminDashboard() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="font-bold text-2xl text-foreground tracking-tight">
					Overview
				</h2>
				<p className="text-muted-foreground">
					Monitor your bot's usage and token consumption.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Current Balance
						</CardTitle>
						<DollarSign size={16} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">$37.50</div>
						<p className="text-muted-foreground text-xs">Available funds</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Total Tokens</CardTitle>
						<Zap size={16} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">19,550</div>
						<p className="text-muted-foreground text-xs">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Questions Answered
						</CardTitle>
						<MessageSquare size={16} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">3,039</div>
						<p className="text-muted-foreground text-xs">
							+15% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">
							Active Connectors
						</CardTitle>
						<Bot size={16} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">2</div>
						<p className="text-muted-foreground text-xs">
							Product DB, Internal Wiki
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Current Spend</CardTitle>
						<CreditCard size={16} className="text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">$12.50</div>
						<p className="text-muted-foreground text-xs">
							Limit: $50.00 / month
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Token Consumption</CardTitle>
						<CardDescription>
							Daily token usage over the last 7 days
						</CardDescription>
					</CardHeader>
					<CardContent className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<CartesianGrid
									strokeDasharray="3 3"
									vertical={false}
									stroke="#e4e4e7"
								/>
								<XAxis
									dataKey="name"
									stroke="#888888"
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									stroke="#888888"
									fontSize={12}
									tickLine={false}
									axisLine={false}
									tickFormatter={(value) => `${value}`}
								/>
								<Tooltip
									cursor={{ fill: "transparent" }}
									contentStyle={{
										borderRadius: "8px",
										border: "1px solid #e4e4e7",
									}}
								/>
								<Bar dataKey="tokens" fill="#16a34a" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Questions Asked</CardTitle>
						<CardDescription>
							End-user interactions over the last 7 days
						</CardDescription>
					</CardHeader>
					<CardContent className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={data}>
								<CartesianGrid
									strokeDasharray="3 3"
									vertical={false}
									stroke="#e4e4e7"
								/>
								<XAxis
									dataKey="name"
									stroke="#888888"
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									stroke="#888888"
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip
									cursor={{
										stroke: "#a1a1aa",
										strokeWidth: 1,
										strokeDasharray: "3 3",
									}}
									contentStyle={{
										borderRadius: "8px",
										border: "1px solid #e4e4e7",
									}}
								/>
								<Line
									type="monotone"
									dataKey="questions"
									stroke="#16a34a"
									strokeWidth={2}
									activeDot={{ r: 8 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
