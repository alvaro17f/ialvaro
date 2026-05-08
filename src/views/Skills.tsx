import { useEffect, useState } from "react";
import { Header } from "src/components/Header";
import { TechSphere } from "src/components/TechSphere";
import { SpotlightCard } from "src/components/SpotlightCard";
import { useScrollReveal } from "src/hooks/useScrollReveal";
import data from "src/data/skills.json";

const featuredIndices = new Set([0, 5, 8]);
const TABLET_BP = 768;

export const Skills = () => {
	const [isDesktop, setIsDesktop] = useState(false);
	const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

	useEffect(() => {
		setIsDesktop(window.innerWidth >= TABLET_BP);
		const handleResize = () =>
			setIsDesktop(window.innerWidth >= TABLET_BP);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<section id="skills" className="section-curve">
			<Header title="Skills" />
			{isDesktop ? (
				<div
					className={`transition-all duration-700 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					<TechSphere />
				</div>
			) : (
				<div
					ref={ref}
					className="grid grid-cols-2 grid-flow-dense gap-4 md:gap-6"
				>
					{data.map(({ id, title, image, url }, i) => {
						const isFeatured = featuredIndices.has(i);
						return (
							<a
								key={id}
								href={url}
								rel="noopener noreferrer"
								target="_blank"
								className={`
									spotlight-card grid gap-3 p-6 text-center cursor-pointer place-items-center group transition-all duration-500
									${isFeatured ? "col-span-2 row-span-2 p-10" : ""}
									${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
								`}
								style={{ transitionDelay: `${i * 60}ms` }}
								aria-label={`Skill: ${title}`}
							>
								<img
									src={image}
									alt={title}
									className={`object-contain transition-transform duration-500 group-hover:scale-110 ${
										isFeatured
											? "w-32 h-32"
											: "w-24 h-24"
									}`}
								/>
								<h2
									className={`font-medium text-alvaro-muted group-hover:text-alvaro-white transition-colors duration-200 ${
										isFeatured ? "text-base" : "text-sm"
									}`}
								>
									{title}
								</h2>
							</a>
						);
					})}
				</div>
			)}
		</section>
	);
};
