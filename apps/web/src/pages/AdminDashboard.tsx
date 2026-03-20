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
import { PageHeader } from "@/components/layout";
import { StatCard } from "@/components/stats";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ADMIN_STATS, type StatIcon, WEEKLY_STATS_DATA } from "@/data/charts";

export function AdminDashboard() {
	return (
		<div className="space-y-6">
			<PageHeader
				title="Overview"
				subtitle="Monitor your bot's usage and token consumption."
			/>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
				{ADMIN_STATS.map((stat) => (
					<StatCard
						key={stat.title}
						title={stat.title}
						value={stat.value}
						subtitle={stat.subtitle}
						icon={stat.icon as StatIcon}
					/>
				))}
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
							<BarChart data={WEEKLY_STATS_DATA}>
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
								<Bar
									dataKey="tokens"
									fill="var(--primary)"
									radius={[4, 4, 0, 0]}
								/>
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
							<LineChart data={WEEKLY_STATS_DATA}>
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
									stroke="var(--primary)"
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
