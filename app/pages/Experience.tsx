"use client";
import { useRef } from "react";
import { domAnimation, LazyMotion, m, useScroll } from "framer-motion";
import Link from "next/link";
import data from "@/data/portfolio.json";
import Header from "@/components/Header";

export default function Experience() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	return (
		<section id="experience">
			<Header title="Experience" />
			<div className="grid md:grid-cols-2 place-items-center">
				{data.map(({ id, title, image, url, description }) => (
					<LazyMotion key={id} features={domAnimation}>
						<div ref={ref}>
								<Link href={url} target="_blank">
									<m.div
										className="cursor-pointer w-[30dvw]"
										initial={{ scale: 1, opacity: 0 }}
										whileInView={{opacity: 1}}
										viewport={{once: true}}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 1 }}
										transition={{ duration: 0.7 }}
									>
										<div className="h-32" />
										<m.h1
											key={title}
											className="mb-5 text-4xl md:text-6xl text-azama-white w-[100%]"
										>
											{title}
										</m.h1>
										<img src={image} alt={title} />
										<p>{description}</p>
									</m.div>
								</Link>
						</div>
					</LazyMotion>
				))}
			</div>
		</section>
	);
}
