import { domAnimation, LazyMotion, m } from "framer-motion";
import data from "src/data/experience.json";
import { Header } from "src/components/Header";

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const item = {
	hidden: { opacity: 0, x: -30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { type: "spring", stiffness: 80, damping: 20 },
	},
};

export const Experience = () => {
	return (
		<section id="experience">
			<Header title="Experience" />
			<LazyMotion features={domAnimation}>
				<m.div
					variants={container}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{data.map(
						({
							id,
							title,
							image,
							url,
							date_from,
							date_to,
							description,
						}) => (
							<m.div
								key={id}
								className="grid md:grid-cols-[1fr_2fr] mt-12 md:gap-10"
								variants={item}
							>
								<div className="grid gap-2 cursor-pointer md:p-5 h-60 md:mb-36 place-items-center rounded-2xl border-2 border-dashed border-alvaro-border hover:border-alvaro-primary transition-colors duration-300">
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={title}
									>
										<img
											src={image}
											alt={title}
											className="w-56 h-36 object-contain"
										/>
									</a>
									<p className="text-sm font-mono text-alvaro-muted tabular-nums">
										{date_from} — {date_to}
									</p>
								</div>
								<div className="mt-12 md:mt-0">
									<h2 className="mb-5 text-4xl md:text-5xl tracking-tighter leading-none font-semibold text-alvaro-white">
										{title}
									</h2>
									<div className="space-y-8 text-alvaro-muted leading-relaxed max-w-[65ch]">
										{description?.title?.one && (
											<div>
												<h3 className="text-lg font-medium text-alvaro-white mb-2">
													{description.title.one}
												</h3>
												<p>{description.content?.one}</p>
											</div>
										)}
										{description?.title?.two && (
											<div>
												<h3 className="text-lg font-medium text-alvaro-white mb-2">
													{description.title.two}
												</h3>
												<p>{description.content?.two}</p>
											</div>
										)}
										{description?.title?.three && (
											<div>
												<h3 className="text-lg font-medium text-alvaro-white mb-2">
													{description.title.three}
												</h3>
												<p>{description.content?.three}</p>
											</div>
										)}
										{description?.title?.four && (
											<div>
												<h3 className="text-lg font-medium text-alvaro-white mb-2">
													{description.title.four}
												</h3>
												<p>{description.content?.four}</p>
											</div>
										)}
									</div>
								</div>
							</m.div>
						),
					)}
				</m.div>
			</LazyMotion>
		</section>
	);
};
