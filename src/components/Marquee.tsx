type Props = {
	items: string[];
	speed?: number;
};

export const Marquee = ({ items, speed = 30 }: Props) => {
	const content = items.join(" \u2022 ");

	return (
		<div className="marquee-container py-6 border-y border-alvaro-border">
			<div
				className="marquee-track"
				style={{ animationDuration: `${speed}s` }}
			>
				<span className="text-2xl md:text-4xl font-semibold tracking-tight text-alvaro-muted/30 px-4">
					{content} {"\u2022"} {content} {"\u2022"}
				</span>
				<span className="text-2xl md:text-4xl font-semibold tracking-tight text-alvaro-muted/30 px-4">
					{content} {"\u2022"} {content} {"\u2022"}
				</span>
			</div>
		</div>
	);
};
