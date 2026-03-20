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
import { useForm } from "@/lib/useForm";
import { useTheme } from "@/lib/useTheme";
import { registerSchema } from "@/schemas";

interface RegisterFormData extends Record<string, string> {
	email: string;
	password: string;
	confirmPassword: string;
}

const validateRegisterForm = (values: RegisterFormData) => {
	const result = registerSchema.safeParse(values);
	if (result.success) return {};

	const errors: Partial<Record<keyof RegisterFormData, string>> = {};
	for (const issue of result.error.issues) {
		const path = issue.path[0] as keyof RegisterFormData;
		if (!errors[path]) {
			errors[path] = issue.message;
		}
	}
	return errors;
};

export function RegisterPage() {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useTheme();

	const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
		useForm<RegisterFormData>({
			initialValues: { email: "", password: "", confirmPassword: "" },
			validate: validateRegisterForm,
			onSubmit: async () => {
				// Simulated registration - replace with actual API call
				navigate({ to: "/dashboard" });
			},
		});

	const showEmailError = touched.email && errors.email;
	const showPasswordError = touched.password && errors.password;
	const showConfirmPasswordError =
		touched.confirmPassword && errors.confirmPassword;

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
							aria-label={
								theme === "dark"
									? "Switch to light theme"
									: "Switch to dark theme"
							}
							className="rounded-lg border-2 border-primary/50 p-2 text-muted-foreground hover:border-primary hover:text-foreground"
						>
							{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>
				</div>

				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-center text-2xl">
							Create an account
						</CardTitle>
						<CardDescription className="text-center">
							Enter your email below to create your account
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
								<Label htmlFor="password">Password</Label>
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
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm Password</Label>
								<Input
									id="confirm-password"
									name="confirmPassword"
									type="password"
									value={values.confirmPassword ?? ""}
									onChange={(e) =>
										handleChange("confirmPassword")(e.target.value)
									}
									onBlur={handleBlur("confirmPassword")}
									aria-invalid={Boolean(showConfirmPasswordError)}
									aria-describedby={
										showConfirmPasswordError
											? "confirm-password-error"
											: undefined
									}
									className={
										showConfirmPasswordError
											? "border-red-500 focus-visible:ring-red-500"
											: ""
									}
								/>
								{showConfirmPasswordError && (
									<div
										id="confirm-password-error"
										className="flex items-center gap-1.5 text-red-600 text-sm dark:text-red-500"
										aria-live="polite"
									>
										<AlertCircle size={14} />
										<span>{errors.confirmPassword}</span>
									</div>
								)}
							</div>
						</CardContent>
						<CardFooter className="flex flex-col">
							<Button className="w-full" type="submit">
								Create account
							</Button>
							<div className="mt-4 text-center text-muted-foreground text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="rounded-md border-2 border-primary/50 px-3 py-1 font-medium text-primary underline underline-offset-4 hover:border-primary hover:text-primary/80"
								>
									Log in
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
}
