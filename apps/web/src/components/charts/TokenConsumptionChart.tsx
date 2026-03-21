import {
	Bar,
	BarChart,
	CartesianGrid,
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
import type { ChartDataPoint } from "@/data/charts";

interface TokenConsumptionChartProps {
	data: ChartDataPoint[];
}

export function TokenConsumptionChart({ data }: TokenConsumptionChartProps) {
	return (
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
						<Bar dataKey="tokens" fill="var(--primary)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
