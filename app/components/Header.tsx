"use client";
import { motion } from "framer-motion";

type Props = {
	title: string;
	duration?: number;
};

export default function Header({ title, duration = 1.2 }: Props) {
	return (
		<motion.section
			className="p-5 mb-5 rounded-lg text-azama-dark bg-azama-primary"
			initial={{ x: 0, y: 0, opacity: 0, scaleY: 0.5 }}
			animate={{ x: 0, y: 0, opacity: 1, scaleY: 1 }}
			transition={{ ease: "easeOut", duration }}
		>
			<motion.h1
			className="text-7xl"
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{duration}}
			>
				{title}
			</motion.h1>
		</motion.section>
	);
}
