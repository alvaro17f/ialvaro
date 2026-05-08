import { domAnimation, LazyMotion, m } from "framer-motion";
import { Header } from "src/components/Header";
import data from "src/data/skills.json";

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.2,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 100, damping: 20 },
	},
};

export const Skills = () => {
	return (
		<section id="skills">
			<Header title="Skills" />
			<LazyMotion features={domAnimation}>
				<m.div
					className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
					variants={container}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{data.map(({ id, title, image, url }) => (
						<m.a
							key={id}
							href={url}
							rel="noopener noreferrer"
							target="_blank"
							className="grid gap-3 p-6 text-center cursor-pointer place-items-center rounded-2xl bg-alvaro-surface border border-alvaro-border hover:border-alvaro-primary transition-colors duration-300 group"
							variants={item}
							whileHover={{ y: -4 }}
							whileTap={{ scale: 0.98 }}
							aria-label={`Skill: ${title}`}
						>
							<img
								src={image}
								alt={title}
								className="w-24 h-24 md:w-32 md:h-32 object-contain"
							/>
							<h2 className="text-sm font-medium text-alvaro-muted group-hover:text-alvaro-white transition-colors duration-200">
								{title}
							</h2>
						</m.a>
					))}
				</m.div>
			</LazyMotion>
		</section>
	);
};
