"use client";
import { m, domAnimation, LazyMotion } from "framer-motion";

type Props = {
	duration?: number;
	children: React.ReactNode;
	bg?: string;
	text?: string;
};

export default function Content({
	children,
	duration = 1,
	bg,
	text = "white",
}: Props) {
	return (
		<>
			<LazyMotion features={domAnimation}>
				<m.section
					className={`p-5 mb-5 rounded-lg text-azama-${text} ${bg}`}
					initial={{ x: -800, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					viewport={{once: true}}
					transition={{ duration }}
					aria-label="content"
				>
					<article className="p-5">
						{children}
					</article>
				</m.section>
			</LazyMotion>
		</>
	);
}
