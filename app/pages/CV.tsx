import { domAnimation, LazyMotion, m } from "framer-motion";

export default function CV() {
	return (
		<>
			<LazyMotion features={domAnimation}>
				<section id="cv">
					<div className="h-24" />
					<a href="/cv/cv.pdf" target="_blank" rel="noopener noreferrer">
						<m.div
							className="grid place-items-center p-5 mb-5 rounded-xl border-[5px] border-alvaro-danger text-alvaro-white"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
							whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
							viewport={{ once: false }}
							transition={{ duration: 2 }}
							aria-label="content"
						>
							<h1 className="text-5xl text-center">GET MY CV FOR FREE!</h1>
							<img
								src="/cv/download.svg"
								alt="download"
								className="w-10 h-10 mt-5"
							/>
						</m.div>
					</a>
				</section>
			</LazyMotion>
		</>
	);
}
