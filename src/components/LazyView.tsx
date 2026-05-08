import { domAnimation, LazyMotion, m } from "framer-motion";

type Props = {
	children: React.ReactNode;
	once?: boolean;
	duration?: number;
};

export const LazyView = ({ children, once = true, duration = 1 }: Props) => {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once }}
				transition={{
					type: "spring",
					stiffness: 80,
					damping: 20,
					duration,
				}}
				variants={{
					visible: { opacity: 1, y: 0 },
					hidden: { opacity: 0, y: 20 },
				}}
			>
				{children}
			</m.div>
		</LazyMotion>
	);
};
