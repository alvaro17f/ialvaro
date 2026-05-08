import { Header } from "src/components/Header";
import { useScrollReveal } from "src/hooks/useScrollReveal";
import data from "src/data/experience.json";

export const Experience = () => {
	return (
		<section id="experience">
			<Header title="Experience" />
			<div className="space-y-24">
				{data.map((entry, i) => (
					<ExperienceEntry key={entry.id} entry={entry} index={i} />
				))}
			</div>
		</section>
	);
};

type Entry = (typeof data)[number];

const ExperienceEntry = ({
	entry,
	index,
}: { entry: Entry; index: number }) => {
	const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

	return (
		<div
			ref={ref}
			className={`grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 transition-all duration-700 ease-out ${
				isVisible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8"
			}`}
			style={{ transitionDelay: `${index * 100}ms` }}
		>
			<div className="grid gap-3 cursor-pointer md:p-5 h-60 place-items-center rounded-2xl border-2 border-dashed border-alvaro-border hover:border-alvaro-primary transition-colors duration-300 group">
				<a
					href={entry.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={entry.title}
				>
					<img
						src={entry.image}
						alt={entry.title}
						className="w-56 h-36 object-contain transition-transform duration-500 group-hover:scale-105"
					/>
				</a>
				<p className="text-sm font-mono text-alvaro-muted tabular-nums">
					{entry.date_from} — {entry.date_to}
				</p>
			</div>
			<div className="mt-12 md:mt-0">
				<h2 className="mb-6 text-4xl md:text-5xl tracking-tighter leading-none font-semibold text-alvaro-white">
					{entry.title}
				</h2>
				<div className="space-y-6 text-alvaro-muted leading-relaxed max-w-[65ch]">
					{entry.description?.title?.one && (
						<div>
							<h3 className="text-lg font-medium text-alvaro-white mb-2">
								{entry.description.title.one}
							</h3>
							<p>{entry.description.content?.one}</p>
						</div>
					)}
					{entry.description?.title?.two && (
						<div>
							<h3 className="text-lg font-medium text-alvaro-white mb-2">
								{entry.description.title.two}
							</h3>
							<p>{entry.description.content?.two}</p>
						</div>
					)}
					{entry.description?.title?.three && (
						<div>
							<h3 className="text-lg font-medium text-alvaro-white mb-2">
								{entry.description.title.three}
							</h3>
							<p>{entry.description.content?.three}</p>
						</div>
					)}
					{entry.description?.title?.four && (
						<div>
							<h3 className="text-lg font-medium text-alvaro-white mb-2">
								{entry.description.title.four}
							</h3>
							<p>{entry.description.content?.four}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
