"use client";
import "animate.css";

export default function Content({ children }: { children: React.ReactNode }) {
	return (
		<>
			<section
				className="p-5 rounded-lg text-azama-text-dark bg-azama-text-white animate__animated animate__fadeInLeft animate__delay-1s"
				aria-label="content"
			>
				<article className="p-5 m-5 animate__animated animate__fadeIn animate__delay-2s">
					{children}
				</article>
			</section>
		</>
	);
}