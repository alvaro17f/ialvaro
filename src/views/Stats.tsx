import { AnimatedCounter } from "src/components/AnimatedCounter";

const stats = [
	{ value: 5, suffix: "+", label: "Years experience", bar: 60 },
	{ value: 20, suffix: "+", label: "Projects delivered", bar: 80 },
	{ value: 12, suffix: "", label: "Technologies", bar: 50 },
	{ value: 100, suffix: "%", label: "Commitment", bar: 100, accent: true },
];

export const Stats = () => {
	return (
		<section className="py-32 md:py-48">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
				{stats.map((stat) => (
					<div key={stat.label} className="text-center">
						<div
							className={`text-5xl md:text-7xl font-bold tracking-tighter ${
								stat.accent
									? "text-alvaro-primary"
									: "text-alvaro-white"
							}`}
						>
							<AnimatedCounter
								end={stat.value}
								suffix={stat.suffix}
							/>
						</div>
						{/* Progress bar */}
						<div className="mt-3 mx-auto w-16 h-1 bg-alvaro-border rounded-full overflow-hidden">
							<div
								className={`h-full rounded-full transition-all duration-1000 delay-500 ${
									stat.accent
										? "bg-alvaro-primary"
										: "bg-alvaro-muted/50"
								}`}
								style={{ width: `${stat.bar}%` }}
							/>
						</div>
						<p className="mt-2 text-sm text-alvaro-muted">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};
