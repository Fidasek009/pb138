import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function BillingSettingsTab() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Usage & Limits</CardTitle>
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
	);
}
