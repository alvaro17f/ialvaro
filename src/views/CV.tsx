import { domAnimation, LazyMotion, m } from "framer-motion";
import { DownloadSimple } from "@phosphor-icons/react";

export const CV = () => {
	return (
		<LazyMotion features={domAnimation}>
			<section id="cv" className="mt-12">
				<a
					href="/cv/cv.pdf"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Download CV"
				>
					<m.div
						className="grid place-items-center p-8 rounded-2xl border-2 border-alvaro-border bg-alvaro-surface hover:border-alvaro-primary transition-colors duration-300 group cursor-pointer"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
						viewport={{ once: true }}
						transition={{
							type: "spring",
							stiffness: 100,
							damping: 20,
						}}
					>
						<h2 className="text-3xl md:text-4xl tracking-tight font-semibold text-alvaro-white group-hover:text-alvaro-primary transition-colors duration-200">
							Download my CV
						</h2>
						<DownloadSimple
							size={32}
							weight="bold"
							className="mt-4 text-alvaro-muted group-hover:text-alvaro-primary transition-colors duration-200"
						/>
					</m.div>
				</a>
			</section>
		</LazyMotion>
	);
};
