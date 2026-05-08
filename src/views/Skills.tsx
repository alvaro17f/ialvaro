import { Header } from "src/components/Header";
import { useScrollReveal } from "src/hooks/useScrollReveal";
import data from "src/data/skills.json";

export const Skills = () => {
	const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

	return (
		<section id="skills">
			<Header title="Skills" />
			<div
				ref={ref}
				className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
			>
				{data.map(({ id, title, image, url }, i) => (
					<a
						key={id}
						href={url}
						rel="noopener noreferrer"
						target="_blank"
						className={`grid gap-3 p-6 text-center cursor-pointer place-items-center rounded-2xl bg-alvaro-surface border border-alvaro-border spring-hover group transition-all duration-500 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-6"
						}`}
						style={{ transitionDelay: `${i * 70}ms` }}
						aria-label={`Skill: ${title}`}
					>
						<img
							src={image}
							alt={title}
							className="w-24 h-24 md:w-32 md:h-32 object-contain transition-transform duration-500 group-hover:scale-110"
						/>
						<h2 className="text-sm font-medium text-alvaro-muted group-hover:text-alvaro-white transition-colors duration-200">
							{title}
						</h2>
					</a>
				))}
			</div>
		</section>
	);
};
