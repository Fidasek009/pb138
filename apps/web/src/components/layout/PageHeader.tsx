interface PageHeaderProps {
	title: string;
	subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
	return (
		<div>
			<h2 className="font-bold text-2xl text-foreground tracking-tight">
				{title}
			</h2>
			{subtitle && <p className="text-muted-foreground">{subtitle}</p>}
		</div>
	);
}
