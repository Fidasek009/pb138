import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Bot, Moon, Sun } from "lucide-react";
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
import { useForm, validators } from "@/lib/useForm";
import { useTheme } from "@/lib/useTheme";

interface LoginFormData extends Record<string, string> {
	email: string;
	password: string;
}

const validateLoginForm = (values: LoginFormData) => {
	const errors: Partial<Record<keyof LoginFormData, string>> = {};

	const emailError = validators.email(values.email);
	if (emailError) errors.email = emailError;

	const passwordError = validators.password(values.password, 6);
	if (passwordError) errors.password = passwordError;

	return errors;
};

export function LoginPage() {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useTheme();

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useForm<LoginFormData>({
			initialValues: { email: "", password: "" },
			validate: validateLoginForm,
			onSubmit: async () => {
				// Simulated login - replace with actual API call
				navigate({ to: "/dashboard" });
			},
		});

	const showEmailError = touched.email && errors.email;
	const showPasswordError = touched.password && errors.password;

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
							aria-label={
								theme === "dark"
									? "Switch to light theme"
									: "Switch to dark theme"
							}
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
					<form onSubmit={handleSubmit} noValidate>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									value={values.email}
									onChange={(e) => handleChange("email")(e.target.value)}
									onBlur={handleBlur("email")}
									aria-invalid={Boolean(showEmailError)}
									aria-describedby={showEmailError ? "email-error" : undefined}
									className={
										showEmailError
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}
								/>
								{showEmailError && (
									<div
										id="email-error"
										className="flex items-center gap-1.5 text-red-600 text-sm dark:text-red-500"
										aria-live="polite"
									>
										<AlertCircle size={14} />
										<span>{errors.email}</span>
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
									value={values.password}
									onChange={(e) => handleChange("password")(e.target.value)}
									onBlur={handleBlur("password")}
									aria-invalid={Boolean(showPasswordError)}
									aria-describedby={
										showPasswordError ? "password-error" : undefined
									}
									className={
										showPasswordError
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}
								/>
								{showPasswordError && (
									<div
										id="password-error"
										className="flex items-center gap-1.5 text-red-600 text-sm dark:text-red-500"
										aria-live="polite"
									>
										<AlertCircle size={14} />
										<span>{errors.password}</span>
									</div>
								)}
							</div>
						</CardContent>
						<CardFooter className="flex flex-col">
							<Button
								className="w-full border-2 border-primary hover:border-primary/80"
								type="submit"
							>
								Log in
							</Button>
							<div className="mt-4 text-center text-muted-foreground text-sm">
								Don&apos;t have an account?{" "}
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
