import Content from "@/components/Content";
import { domAnimation, LazyMotion, m } from "framer-motion";

export default function Resume() {
	return (
		<>
			<LazyMotion features={domAnimation}>
				<section id="resume">
					<div className="h-24" />
					<a href="/assets/resume.pdf" target="_blank" rel="noreferrer">
						<m.div
							className="grid place-items-center p-5 mb-5 rounded-xl border-[5px] border-azama-danger text-azama-white"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
							whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
							viewport={{ once: false }}
							transition={{ duration: 2 }}
							aria-label="content"
						>
							<h1 className="text-5xl text-center">GET MY RESUME FOR FREE!</h1>
							<img src="/skills/react.svg" alt="download" className="h-20" />
						</m.div>
					</a>
				</section>
			</LazyMotion>
		</>
	);
}
