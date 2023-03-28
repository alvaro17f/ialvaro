import { motion } from "framer-motion";
type Props = {
	children: React.ReactNode;
    once?: boolean
};

export default function LazyView({ children, once = true }: Props) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: once }}
			transition={{ duration: 0.3 }}
			variants={{
				visible: { opacity: 1, scale: 1 },
				hidden: { opacity: 0, scale: 0 },
			}}
		>
			{children}
		</motion.div>
	);
}
