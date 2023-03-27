"use client";
import "animate.css";

export default function Content({ children }: { children: React.ReactNode }) {
	return (
		<>
			<section
				className="p-5 mb-5 rounded-lg text-azama-dark bg-azama-white animate__animated animate__fadeInLeft animate__delay-0.7s"
				aria-label="content"
			>
				<article className="p-5 animate__animated animate__fadeIn animate__delay-1.2s">
					{children}
				</article>
			</section>
		</>
	);
}
