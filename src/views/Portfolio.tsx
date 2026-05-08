import { Header } from "src/components/Header";
import data from "src/data/portfolio.json";

export const Portfolio = () => {
	return (
		<section id="portfolio" className="section-curve">
			<Header title="Portfolio" />
			<div className="space-y-6">
				{data.map(({ id, title, image, url, description }, i) => (
					<div
						key={id}
						className="sticky top-20 grid md:grid-cols-[1fr_2fr] gap-8 p-6 md:p-10 rounded-3xl bg-alvaro-surface border border-alvaro-border group transition-colors duration-300 hover:border-alvaro-primary/20"
						style={{ zIndex: i + 1 }}
					>
						<div className="grid cursor-pointer place-items-center rounded-2xl overflow-hidden bg-alvaro-base/50">
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
						<div className="flex flex-col justify-center">
							<h2 className="mb-4 text-3xl md:text-4xl tracking-tighter leading-none font-bold text-alvaro-white">
								{title}
							</h2>
							<p className="text-alvaro-muted leading-relaxed max-w-[60ch]">
								{description}
							</p>
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-alvaro-primary hover:underline underline-offset-4"
							>
								View project
								<span className="transition-transform duration-200 group-hover:translate-x-1">
									&rarr;
								</span>
							</a>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
