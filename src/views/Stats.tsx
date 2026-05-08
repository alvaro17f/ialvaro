import { AnimatedCounter } from "src/components/AnimatedCounter";

const stats = [
	{ value: 5, suffix: "+", label: "Years experience" },
	{ value: 20, suffix: "+", label: "Projects delivered" },
	{ value: 12, suffix: "", label: "Technologies" },
	{ value: 100, suffix: "%", label: "Commitment", accent: true },
];

export const Stats = () => {
	return (
		<section className="py-32 md:py-48">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
				{stats.map((stat) => (
					<div key={stat.label}>
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
						<p className="mt-3 text-sm text-alvaro-muted">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};
