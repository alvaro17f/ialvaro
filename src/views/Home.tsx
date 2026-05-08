import { Wobble } from "src/components/Wobble";
import { useScrollReveal } from "src/hooks/useScrollReveal";

export const Home = () => {
	const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

	return (
		<section
			id="home"
			className="min-h-[100dvh] grid md:grid-cols-[1.3fr_1fr] items-center gap-8 md:gap-16 px-4 md:px-0"
		>
			<div ref={ref} className="space-y-6">
				<div className="space-y-1">
					<Wobble sentence="ALVARO" />
					<Wobble sentence="GARCIA" />
					<Wobble sentence="MACIAS" />
				</div>
				<p
					className={`text-alvaro-muted text-lg leading-relaxed max-w-[40ch] transition-all duration-700 delay-300 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4"
					}`}
				>
					Full Stack Developer. Building interfaces that move.
				</p>
				<div
					className={`flex gap-4 pt-2 transition-all duration-700 delay-500 ${
						isVisible
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-4"
					}`}
				>
					<a
						href="#portfolio"
						className="px-6 py-3 bg-alvaro-primary text-alvaro-dark font-medium rounded-lg hover:opacity-90 transition-all duration-200 active:scale-[0.97]"
					>
						View work
					</a>
					<a
						href="/cv/cv.pdf"
						target="_blank"
						className="px-6 py-3 border border-alvaro-border text-alvaro-white font-medium rounded-lg hover:border-alvaro-primary hover:text-alvaro-primary transition-all duration-200 active:scale-[0.97]"
					>
						CV
					</a>
				</div>
			</div>
			<div
				className={`hidden md:flex justify-center transition-all duration-1000 delay-200 ${
					isVisible
						? "opacity-100 translate-x-0"
						: "opacity-0 translate-x-8"
				}`}
			>
				<div className="relative">
					<img
						src="/images/profile/profile.png"
						alt="Alvaro Garcia Macias"
						className="w-72 h-72 object-cover rounded-2xl border-2 border-alvaro-border"
					/>
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-alvaro-base/30 to-transparent" />
				</div>
			</div>
		</section>
	);
};
