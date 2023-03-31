"use client";
import { useRef } from "react";
import { domAnimation, LazyMotion, m, useScroll } from "framer-motion";
import Link from "next/link";
import data from "@/data/skills.json";
import Header from "@/components/Header";

export default function Skills() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	return (
		<section id="skills">
			<Header title="Skills" />
			<div className="grid gap-5 md:grid-cols-4 place-items-center">
				{data.map(({ id, title, image, url }) => (
					<LazyMotion key={id} features={domAnimation}>
						<div ref={ref} className="grid place-content-center">
							<a href={url} rel="noreferrer" target="_blank">
								<m.div
									className="grid p-5 text-center border-dashed cursor-pointer from-transparent to-azama-muted bg-gradient-to-br hover:to-azama-primary place-items-center rounded-xl"
									initial={{ scale: 1, opacity: 0 }}
									whileInView={{opacity: 1}}
									viewport={{once: true}}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 1 }}
									transition={{ duration: 0.7 }}
								>
									{/* <div className="h-32" /> */}
									<img src={image} alt={title} className="w-44 h-44 " />
									<m.h1 key={title} className="mb-5 text-xl text-azama-white">
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
