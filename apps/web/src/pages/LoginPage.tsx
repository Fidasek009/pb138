import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Bot, Moon, Sun } from "lucide-react";
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
import { useTheme } from "@/lib/useTheme";

export function LoginPage() {
	const navigate = useNavigate();
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [formError, setFormError] = useState("");
	const { theme, toggleTheme } = useTheme();

	const validateEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormError("");
		setEmailError("");
		setPasswordError("");

		const emailValue =
			(e.currentTarget as HTMLFormElement).email?.value.trim() || "";
		const passwordValue =
			(e.currentTarget as HTMLFormElement).password?.value.trim() || "";

		if (!emailValue) {
			setEmailError("Email is required");
			return;
		}
		if (!validateEmail(emailValue)) {
			setEmailError("Please enter a valid email address");
			return;
		}
		if (!passwordValue) {
			setPasswordError("Password is required");
			return;
		}
		if (passwordValue.length < 6) {
			setPasswordError("Password must be at least 6 characters");
			return;
		}

		// Simulated login
		navigate({ to: "/dashboard" });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
			<div className="w-full max-w-sm">
				<div className="mb-8 flex flex-col items-center">
					<div className="mb-6 flex w-full items-center justify-between rounded-lg border-2 border-primary/30 p-4">
						<Link to="/" className="flex items-center gap-2">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-primary bg-primary text-primary-foreground">
								<Bot size={24} />
							</div>
							<span className="font-bold text-card-foreground text-xl">
								PagePal
							</span>
						</Link>
						<button
							type="button"
							onClick={toggleTheme}
							className="rounded-lg border-2 border-primary/50 p-2 text-muted-foreground hover:border-primary hover:text-foreground"
						>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>
				</div>

				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-center text-2xl">Log in</CardTitle>
						<CardDescription className="text-center">
							Enter your email and password to access your dashboard
						</CardDescription>
					</CardHeader>
					<form onSubmit={onSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									required
									className={
										emailError
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}
								/>
								{emailError && (
									<div className="flex items-center gap-1.5 text-red-600 text-sm dark:text-red-500">
										<AlertCircle size={14} />
										<span>{emailError}</span>
									</div>
								)}
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Password</Label>
									<button
										type="button"
										className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
									>
										Forgot password?
									</button>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									required
									className={
										passwordError
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}
								/>
								{passwordError && (
									<div className="flex items-center gap-1.5 text-red-600 text-sm dark:text-red-500">
										<AlertCircle size={14} />
										<span>{passwordError}</span>
									</div>
								)}
							</div>
						</CardContent>
						{formError && (
							<div className="mx-4 mb-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-red-600 text-sm dark:bg-red-900/20">
								<AlertCircle size={16} />
								<span>{formError}</span>
							</div>
						)}
						<CardFooter className="flex flex-col">
							<Button
								className="w-full border-2 border-primary hover:border-primary/80"
								type="submit"
							>
								Log in
							</Button>
							<div className="mt-4 text-center text-muted-foreground text-sm">
								Don't have an account?{" "}
								<Link
									to="/register"
									className="rounded-md border-2 border-primary/50 px-3 py-1 font-medium text-primary underline underline-offset-4 hover:border-primary hover:text-primary/80"
								>
									Sign up
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
