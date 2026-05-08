import { useEffect, useState } from "react";
import { ScrambleWobble } from "src/components/ScrambleWobble";
import { useScrollReveal } from "src/hooks/useScrollReveal";

export const Home = () => {
	const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
	const [parallax, setParallax] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setParallax(window.scrollY * 0.12);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section
			id="home"
			className="relative min-h-[100dvh] grid md:grid-cols-[1.4fr_1fr] items-center justify-items-center md:justify-items-start gap-8 md:gap-16 px-4 md:px-0 overflow-hidden"
		>
			{/* Gradient mesh background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="mesh-blob absolute top-1/4 -left-1/4 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-alvaro-primary/8 blur-[120px]" />
				<div className="mesh-blob-delayed absolute bottom-1/3 -right-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-alvaro-primary/5 blur-[100px]" />
				<div className="mesh-blob-slow absolute top-1/2 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-alvaro-primary/3 blur-[80px]" />
			</div>

			<div
				ref={ref}
				className="relative z-10 space-y-8 text-center md:text-left"
			>
				<h1 className="text-[clamp(3.5rem,10vw,8rem)] md:text-[clamp(5rem,8vw,9rem)] tracking-[-0.04em] leading-[0.85] font-bold">
					<ScrambleWobble
						text="ALVARO"
						className="block text-alvaro-white"
					/>
					<ScrambleWobble
						text="GARCIA"
						className="block text-alvaro-muted"
						scrambleSpeed={50}
					/>
					<ScrambleWobble
						text="MACIAS"
						className="block text-alvaro-white"
						scrambleSpeed={60}
					/>
				</h1>

				<p
					className={`text-alvaro-muted text-lg md:text-xl leading-relaxed max-w-[35ch] mx-auto md:mx-0 transition-all duration-700 delay-1000 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4"
					}`}
				>
					Full Stack Developer. Building interfaces that move.
				</p>

				<div
					className={`flex gap-4 justify-center md:justify-start pt-2 transition-all duration-700 delay-[1200ms] ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4"
					}`}
				>
					<a
						href="#portfolio"
						className="px-8 py-3.5 bg-alvaro-primary text-alvaro-dark font-semibold rounded-xl hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
					>
						View work
					</a>
					<a
						href="/cv/cv.pdf"
						target="_blank"
						className="px-8 py-3.5 border border-alvaro-border text-alvaro-white font-semibold rounded-xl hover:border-alvaro-primary hover:text-alvaro-primary transition-all duration-200 active:scale-[0.97]"
					>
						CV
					</a>
				</div>
			</div>

			{/* Profile image — desktop, parallax */}
			<div
				className={`hidden md:block relative z-10 transition-all duration-1000 delay-500 ${
					isVisible
						? "opacity-100 translate-x-0"
						: "opacity-0 translate-x-12"
				}`}
			>
				<div className="relative group">
					<div className="absolute -inset-4 rounded-3xl bg-alvaro-primary/5 blur-2xl group-hover:bg-alvaro-primary/10 transition-colors duration-700" />
					<img
						src="/images/profile/profile.png"
						alt="Alvaro Garcia Macias"
						className="relative w-80 h-80 object-cover rounded-3xl border-2 border-alvaro-border transition-transform duration-700 group-hover:scale-[1.02] group-hover:border-alvaro-primary/30"
						style={{
							transform: `translateY(${parallax}px)`,
							willChange: "transform",
						}}
					/>
					<div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-alvaro-base/50 via-transparent to-transparent" />
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
				<div className="w-6 h-10 border-2 border-alvaro-muted/30 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-alvaro-muted/50 rounded-full mt-2 animate-bounce" />
				</div>
			</div>
		</section>
	);
};
