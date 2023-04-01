"use client";
import { domAnimation, LazyMotion, m, useScroll } from "framer-motion";
import data from "@/data/skills.json";
import Header from "@/components/Header";

export default function Skills() {
	return (
		<section id="skills">
			<Header title="Skills" />
			<div className="grid grid-cols-2 gap-5 md:grid-cols-4 place-items-center">
				{data.map(({ id, title, image, url }) => (
					<LazyMotion key={id} features={domAnimation}>
						<div className="grid place-content-center">
							<a href={url} rel="noreferrer" target="_blank">
								<m.div
									className="grid gap-2 p-5 text-center border-dashed cursor-pointer place-items-center rounded-xl"
									initial={{ scale: 1, opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: false }}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 1 }}
									transition={{ duration: 0.7 }}
								>
									{/* <div className="h-32" /> */}
									<img src={image} alt={title} className="w-40 h-40 p-3" />
									<m.h1 key={title} className="mb-5 text-xl text-alvaro-white">
										{title}
									</m.h1>
								</m.div>
							</a>
						</div>
					</LazyMotion>
				))}
			</div>
		</section>
	);
}
