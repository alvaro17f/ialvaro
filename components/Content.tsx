"use client";
import { motion } from "framer-motion";

type Props = {
	duration?: number;
	children: React.ReactNode;
};

export default function Content({ children, duration = 1 }: Props) {
	return (
		<>
			<motion.section
				className="p-5 mb-5 rounded-lg text-azama-dark bg-azama-white"
				initial={{ x: -800, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ duration }}
				aria-label="content"
			>
				<article className="p-5 animate__animated animate__fadeIn animate__delay-1.2s">
					{children}
				</article>
			</motion.section>
		</>
	);
}
