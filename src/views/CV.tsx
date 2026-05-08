import { DownloadSimple } from "@phosphor-icons/react";

export const CV = () => {
	return (
		<section id="cv" className="mt-16">
			<a
				href="/cv/cv.pdf"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Download CV"
			>
				<div className="grid place-items-center p-8 md:p-12 rounded-2xl border-2 border-alvaro-border bg-alvaro-surface hover:border-alvaro-primary transition-all duration-300 group cursor-pointer active:scale-[0.99]">
					<h2 className="text-3xl md:text-4xl tracking-tight font-semibold text-alvaro-white group-hover:text-alvaro-primary transition-colors duration-200">
						Download my CV
					</h2>
					<DownloadSimple
						size={32}
						weight="bold"
						className="mt-4 text-alvaro-muted group-hover:text-alvaro-primary transition-colors duration-200"
					/>
				</div>
			</a>
		</section>
	);
};
