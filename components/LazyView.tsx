import { motion } from "framer-motion";
type Props = {
	children: React.ReactNode;
	once?: boolean;
	duration?: number;
};

export default function LazyView({
	children,
	once = true,
	duration = 0.3,
}: Props) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: once }}
			transition={{ duration }}
			variants={{
				visible: { opacity: 1, scale: 1 },
				hidden: { opacity: 0, scale: 0 },
			}}
		>
			{children}
		</motion.div>
	);
}
