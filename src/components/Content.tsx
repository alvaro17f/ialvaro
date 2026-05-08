import { domAnimation, LazyMotion, m } from "framer-motion";

type Props = {
	children: React.ReactNode;
	duration?: number;
};

export const Content = ({ children, duration = 1 }: Props) => {
	return (
		<LazyMotion features={domAnimation}>
			<m.section
				className="p-6 md:p-8"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ type: "spring", stiffness: 80, damping: 20, duration }}
			>
				{children}
			</m.section>
		</LazyMotion>
	);
};
