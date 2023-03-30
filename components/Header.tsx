"use client";
import { domAnimation, LazyMotion, m } from "framer-motion";

type Props = {
	title: string;
	duration?: number;
};

export default function Header({ title, duration = 1.2 }: Props) {
	return (
		<LazyMotion features={domAnimation}>
			<m.section
				className="p-2 mb-5 rounded-lg text-azama-dark bg-azama-primary"
				initial={{ width: "0%", opacity: 0, scaleY: 0.5 }}
				animate={{ width: "80%", opacity: 1, scaleY: 1 }}
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
