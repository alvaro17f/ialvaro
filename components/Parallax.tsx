"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LazyView from "./LazyView";

type Props = {
	children: React.ReactNode;
	title?: string;
};

export default function Parallax({ children, title }: Props) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	return (
		<section className="m-0 p-0 pb-32 h-[100dvh] flex justify-center items-center">
			<div ref={ref}>
				<figure className="sticky top-0 w-20 h-20 p-0 m-0">
					<svg
						className="-rotate-90 -translate-x-12 md:-translate-x-72"
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
						<motion.circle
							cx="50"
							cy="50"
							r="30"
							pathLength="1"
							className="stroke-azama-danger fill-none stroke-[5%] [stroke-dashoffset:0]"
							style={{ pathLength: scrollYProgress }}
						/>
					</svg>
				</figure>
				<LazyView>
					<motion.div
						className="cursor-pointer relative h-[300px] w-[200px] md:w-[300px]"
						initial={{ scale: 1 }}
						whileHover={{ scale: 1.3 }}
						whileTap={{ scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						<motion.h1
							key={title}
							className="mb-5 text-6xl text-azama-danger w-[100%]"
						>
							{title}
						</motion.h1>
						{children}
					</motion.div>
				</LazyView>
			</div>
		</section>
	);
}
