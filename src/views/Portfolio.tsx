import { domAnimation, LazyMotion, m } from "framer-motion";
import data from "src/data/portfolio.json";
import { Header } from "src/components/Header";

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const item = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 80, damping: 20 },
	},
};

export const Portfolio = () => {
	return (
		<section id="portfolio">
			<Header title="Portfolio" />
			<LazyMotion features={domAnimation}>
				<m.div
					variants={container}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{data.map(({ id, title, image, url, description }) => (
						<m.div
							key={id}
							className="grid md:grid-cols-[1fr_2fr] mt-12 md:gap-10"
							variants={item}
						>
							<div className="grid cursor-pointer md:p-5 h-60 md:mb-36 place-items-center rounded-2xl bg-alvaro-surface border border-alvaro-border hover:border-alvaro-primary transition-colors duration-300">
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={title}
								>
									<img
										src={image}
										alt={title}
										className="object-contain max-h-40"
									/>
								</a>
							</div>
							<div className="mt-12 md:mt-0">
								<h2 className="mb-5 text-4xl md:text-5xl tracking-tighter leading-none font-semibold text-alvaro-white">
									{title}
								</h2>
								<div className="text-alvaro-muted leading-relaxed max-w-[65ch]">
									<p>{description}</p>
								</div>
							</div>
						</m.div>
					))}
				</m.div>
			</LazyMotion>
		</section>
	);
};
