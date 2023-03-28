"use client";
import "@/styles/parallax.css";
import { useRef } from "react";
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
	MotionValue,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useParallax(scrollYProgress, 300);

	return (
		<section className="parallax_section">
			<div ref={ref}>
				<img
					src={`parallax/${id}.jpg`}
					className={"parallax_img"}
					alt="A London skyscraper"
				/>
			</div>
			<motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
		</section>
	);
}

export default function Parallax() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<>
			{[1, 2, 3, 4, 5].map((image) => (
				<Image key={image} id={image} />
			))}
			<motion.div className="progress" style={{ scaleX }} />
		</>
	);
}
