"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

type Props = {
	children: React.ReactNode;
};

export default function Parallax({ children }: Props) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["end end", "start start"],
	});

	return (
		<section className="m-0 p-0 pb-[100px] h-[100dvh] flex justify-center items-center">
			<div ref={ref}>
				<figure className="sticky top-0 w-20 h-20 p-0 m-0">
					<svg
						className="-translate-x-[100px] -rotate-90 "
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
							className="stroke-azama-danger fill-none stroke-[5%]"
							style={{ pathLength: scrollYProgress }}
						/>
					</svg>
				</figure>
				<motion.div
					className="cursor-pointer relative h-[300px] w-[200px]"
					initial={{ scale: 1 }}
					whileHover={{ scale: 1.3 }}
					whileTap={{ scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					{children}
				</motion.div>
			</div>
		</section>
	);
}
