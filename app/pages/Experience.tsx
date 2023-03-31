"use client";
import { useRef } from "react";
import { domAnimation, LazyMotion, m, useScroll } from "framer-motion";
import Link from "next/link";
import data from "@/data/experience.json";
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
			{data.map(
				({
					id,
					title,
					image,
					url,
					projects,
					tasks,
					date_from,
					date_to,
					description,
				}) => (
					<LazyMotion key={id} features={domAnimation}>
						<div
							ref={ref}
							className="grid md:grid-cols-[1fr_2fr] mt-12 md:gap-10"
						>
							<m.div
								className="grid gap-2 border-dashed cursor-pointer border-[4px] border-azama-muted b-20 md:p-5 h-60 md:mb-36 place-items-center rounded-xl"
								initial={{ scale: 1, opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 1 }}
								transition={{ duration: 0.7 }}
							>
								<Link href={url} target="_blank">
									<img src={image} alt={title} className="w-56 h-36" />
								</Link>
								<p>
									{date_from} - {date_to}
								</p>
							</m.div>
							<div className="mt-12 md:mt-0">
								<m.h1
									key={title}
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: false }}
									transition={{ duration: 1 }}
									className="mb-5 text-4xl md:text-6xl text-azama-primary"
								>
									{title}
								</m.h1>

								<m.div
									className="mb-20 whitespace-pre-wrap"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: false }}
									transition={{ duration: 2 }}
								>
									<p className="text-xl underline text-azama-danger">
										{description?.title.one}
									</p>
									{description.content?.one}
									<br />
									<br />
									<p className="text-xl underline text-azama-danger">
										{description?.title.two}
									</p>
									{description.content?.two}
									<br />
									<br />
									<p className="text-xl underline text-azama-danger">
										{description?.title.three}
									</p>
									{description.content?.three}
									<br />
									<br />
									<p className="text-xl underline text-azama-danger">
										{description?.title.four}
									</p>
									{description.content?.four}
								</m.div>
							</div>
						</div>
					</LazyMotion>
				),
			)}
		</section>
	);
}
