"use client";
import { m, domAnimation, LazyMotion } from "framer-motion";

type Props = {
	children: React.ReactNode;
	duration?: number;
	style?: string;
};

export default function Content({
	children,
	duration = 1,
	style = "text-azama-white",
}: Props) {
	return (
		<>
			<LazyMotion features={domAnimation}>
				<m.section
					className={`p-5 mb-5 rounded-lg ${style}`}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: false }}
					transition={{ duration }}
					aria-label="content"
				>
					<article className="p-5">{children}</article>
				</m.section>
			</LazyMotion>
		</>
	);
}
