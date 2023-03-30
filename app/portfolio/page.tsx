"use client";
import { useRef } from "react";
import { domAnimation, LazyMotion, m, useScroll } from "framer-motion";
import LazyView from "../../components/LazyView";
import Link from "next/link";
import data from "@/data/portfolio.json";
import Header from "@/components/Header";
import Scrollup from "@/components/Scrollup";

// export const metadata = {
// 	title: "Portfolio",
// };

export default function Portfolio() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	return (
		<>
			<title>Portfolio | AZAMA</title>
			<Header title="Portfolio" />
			{data.map(({ id, title, image, url, description }) => (
				<LazyMotion key={id} features={domAnimation}>
					<section className="m-0 p-0 pb-32 h-[100dvh]">
						<div
							ref={ref}
							className="grid grid-cols-[1fr_2fr] place-items-center gap-2"
						>
							<figure className="sticky top-0 w-20 h-20 p-0 m-0">
								<svg
									className="-rotate-90"
									width="75"
									height="75"
									viewBox="0 0 100 100"
								>
									<circle
										cx="50"
										cy="50"
										r="30"
										pathLength="1"
										className="stroke-azama-danger fill-none stroke-[5%] opacity-20"
									/>
									<m.circle
										cx="50"
										cy="50"
										r="30"
										pathLength="1"
										className="stroke-azama-danger fill-none stroke-[5%] [stroke-dashoffset:0]"
										style={{ pathLength: scrollYProgress }}
									/>
								</svg>
							</figure>
							<LazyView duration={1}>
								<Link href={url} target="_blank">
									<m.div
										className="cursor-pointer relative h-[300px]  w-[200px] md:w-[300px]"
										initial={{ scale: 1 }}
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
							</LazyView>
						</div>
					</section>
				</LazyMotion>
			))}
			<Scrollup />
		</>
	);
}
