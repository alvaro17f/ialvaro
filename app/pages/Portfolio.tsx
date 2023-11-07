import { domAnimation, LazyMotion, m } from "framer-motion";
import data from "@/data/portfolio.json";
import Header from "@/components/Header";

export default function Portfolio() {
	return (
		<section id="portfolio">
			<Header title="Portfolio" />
			{data.map(({ id, title, image, url, description }) => (
				<LazyMotion key={id} features={domAnimation}>
					<div className="grid md:grid-cols-[1fr_2fr] mt-12 md:gap-10">
						<m.div
							className="grid gap-2 cursor-pointer md:p-5 h-60 md:mb-36 place-items-center rounded-xl bg-gradient-to-br from-alvaro-primary via-alvaro-secondary to-alvaro-danger"
							aria-label="experience"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: false }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 1 }}
							transition={{ duration: 0.7 }}
						>
							<a href={url} target="_blank" rel="noopener noreferrer">
								<img src={image} alt={title} className="max-h-[13rem]" />
							</a>
						</m.div>
						<div className="mt-12 md:mt-0">
							<m.h1
								key={title}
								aria-label="title"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: false }}
								transition={{ duration: 1 }}
								className="mb-5 text-4xl md:text-6xl text-alvaro-primary"
							>
								{title}
							</m.h1>

							<m.div
								className="mb-20 whitespace-pre-wrap"
								aria-label="content"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: false }}
								transition={{ duration: 2 }}
							>
								<p className="max-w-[50ch] text-alvaro-white">{description}</p>
							</m.div>
						</div>
					</div>
				</LazyMotion>
			))}
		</section>
	);
}
