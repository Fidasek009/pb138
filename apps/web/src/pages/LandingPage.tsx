import { Link } from "@tanstack/react-router";
import { Bot, MessageSquare, Moon, Shield, Sun, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/useTheme";

export function LandingPage() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<header className="flex h-16 items-center border-border border-b px-6">
				<div className="flex flex-1 items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<Bot size={20} />
					</div>
					<span className="font-semibold text-card-foreground">PagePal</span>
				</div>
				<nav className="flex items-center gap-4">
					<button
						type="button"
						onClick={toggleTheme}
						className="text-muted-foreground hover:text-foreground"
					>
						{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</button>
					<Link
						to="/login"
						className="font-medium text-muted-foreground text-sm hover:text-foreground"
					>
						Log in
					</Link>
					<Button asChild>
						<Link to="/register">Get Started</Link>
					</Button>
				</nav>
			</header>

			<main className="flex-1">
				<section className="container mx-auto px-6 py-24 text-center sm:py-32">
					<h1 className="font-bold text-4xl text-foreground tracking-tight sm:text-6xl">
						The intelligent chat widget <br className="hidden sm:inline" />
						for your business.
					</h1>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-8">
						Embed a fully customizable, context-aware AI chatbot directly into
						your website. Connect your own knowledge bases and let your
						customers find answers instantly.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button
							size="lg"
							asChild
							className="border-2 border-primary text-primary-foreground hover:border-primary/80"
						>
							<Link to="/register">Start for free</Link>
						</Button>
						<Button
							variant="outline"
							size="lg"
							asChild
							className="border-2 border-primary hover:border-primary/80"
						>
							<Link to="/login">View Demo Dashboard</Link>
						</Button>
					</div>
				</section>

				<section className="bg-muted py-24">
					<div className="container mx-auto px-6">
						<div className="grid gap-12 sm:grid-cols-3">
							<div className="flex flex-col items-center text-center">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-700 dark:bg-blue-500/40 dark:text-blue-300">
									<Zap size={24} />
								</div>
								<h3 className="mb-2 font-semibold text-foreground text-xl">
									Lightning Fast
								</h3>
								<p className="text-muted-foreground">
									Instant responses powered by advanced AI models. Keep your
									users engaged without waiting.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 text-green-700 dark:bg-green-500/40 dark:text-green-300">
									<Shield size={24} />
								</div>
								<h3 className="mb-2 font-semibold text-foreground text-xl">
									Customizable Context
								</h3>
								<p className="text-muted-foreground">
									Connect MCP sources, define custom rules, and restrict
									terminology to suit your brand.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-purple-700 dark:bg-purple-500/40 dark:text-purple-300">
									<MessageSquare size={24} />
								</div>
								<h3 className="mb-2 font-semibold text-foreground text-xl">
									Embed Anywhere
								</h3>
								<p className="text-muted-foreground">
									Simple React and JS embed codes. Get your widget up and
									running in minutes.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className="border-border border-t py-8">
				<div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
					<div className="flex items-center gap-2">
						<Bot size={16} className="text-foreground" />
						<span className="font-semibold text-foreground text-sm">
							PagePal
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()} PagePal. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
