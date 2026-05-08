import { domAnimation, LazyMotion, m } from "framer-motion";

type Props = {
	title: string;
	duration?: number;
};

export const Header = ({ title, duration = 1.2 }: Props) => {
	return (
		<LazyMotion features={domAnimation}>
			<div className="h-24" />
			<m.section
				className="px-4 py-2 mb-8 rounded-lg text-alvaro-dark bg-alvaro-primary"
				initial={{ width: "0%", opacity: 0 }}
				whileInView={{ width: "100%", opacity: 1 }}
				viewport={{ once: true }}
				transition={{ type: "spring", stiffness: 80, damping: 20 }}
			>
				<m.h1
					className="text-3xl md:text-4xl tracking-tight leading-none font-semibold"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration }}
				>
					{title}
				</m.h1>
			</m.section>
		</LazyMotion>
	);
};
