"use client";
import { domAnimation, LazyMotion, m } from "framer-motion";

type Props = {
	title: string;
	duration?: number;
};

export default function Header({ title, duration = 1.2 }: Props) {
	return (
		<LazyMotion features={domAnimation}>
			<div className="h-24" />
			<m.section
				className="p-2 mb-5 rounded-lg text-alvaro-dark from-alvaro-primary to-transparent bg-gradient-to-r"
				initial={{ width: "0%", opacity: 0, scaleY: 0.5 }}
				whileInView={{ width: "100%", opacity: 1, scaleY: 1 }}
				viewport={{once: false}}
				transition={{ ease: "easeOut", duration }}
			>
				<m.h1
					className="text-5xl md:text-3xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration }}
				>
					{title}
				</m.h1>
			</m.section>
		</LazyMotion>
	);
}
