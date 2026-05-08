import { DownloadSimple } from "@phosphor-icons/react";

export const CV = () => {
	return (
		<section id="cv" className="mt-32 md:mt-48">
			<a
				href="/cv/cv.pdf"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Download CV"
			>
				<div className="grid place-items-center p-10 md:p-16 rounded-3xl border-2 border-alvaro-border bg-alvaro-surface hover:border-alvaro-primary transition-all duration-300 group cursor-pointer active:scale-[0.99] relative overflow-hidden">
					{/* Background glow */}
					<div className="absolute inset-0 bg-gradient-to-br from-alvaro-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					<h2 className="relative z-10 text-4xl md:text-5xl tracking-tight font-bold text-alvaro-white group-hover:text-alvaro-primary transition-colors duration-200">
						Download my CV
					</h2>
					<DownloadSimple
						size={36}
						weight="bold"
						className="relative z-10 mt-5 text-alvaro-muted group-hover:text-alvaro-primary transition-colors duration-200"
					/>
				</div>
			</a>
		</section>
	);
};
