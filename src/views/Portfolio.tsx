import { Header } from "src/components/Header";
import data from "src/data/portfolio.json";

export const Portfolio = () => {
	return (
		<section id="portfolio">
			<Header title="Portfolio" />
			<div className="space-y-8">
				{data.map(({ id, title, image, url, description }, i) => (
					<div
						key={id}
						className="sticky top-24 grid md:grid-cols-[1fr_2fr] gap-8 p-6 md:p-8 rounded-2xl bg-alvaro-surface border border-alvaro-border group"
						style={{ zIndex: i + 1 }}
					>
						<div className="grid cursor-pointer place-items-center rounded-xl overflow-hidden">
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={title}
							>
								<img
									src={image}
									alt={title}
									className="object-contain max-h-40 transition-transform duration-700 group-hover:scale-105"
								/>
							</a>
						</div>
						<div>
							<h2 className="mb-4 text-3xl md:text-4xl tracking-tighter leading-none font-semibold text-alvaro-white">
								{title}
							</h2>
							<p className="text-alvaro-muted leading-relaxed max-w-[65ch]">
								{description}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
