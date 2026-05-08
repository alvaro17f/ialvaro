import { WordReveal } from "src/components/WordReveal";
import { FloatingTags } from "src/components/FloatingTags";
import { TimelineSlider } from "src/components/TimelineSlider";
import { useScrollReveal } from "src/hooks/useScrollReveal";
import data from "src/data/biography.json";
import { useEffect, useState } from "react";

const profileTags = [
	"React",
	"TypeScript",
	"Node.js",
	"Full Stack",
	"UI/UX",
];

export default function Biography() {
	const [slider, setSlider] = useState(Math.round((data.length - 1) / 2));
	const [selectedBio, setSelectedBio] = useState(data[slider]);
	const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

	useEffect(() => {
		if (slider < data.length) setSelectedBio(data[slider]);
	}, [slider]);

	const bioText =
		typeof selectedBio.bio === "string"
			? selectedBio.bio
			: String(selectedBio.bio);

	return (
		<section
			id="biography"
			className="relative min-h-[100dvh] grid items-center overflow-hidden"
		>
			{/* Background glow */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="mesh-blob-delayed absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-alvaro-primary/5 blur-[100px]" />
			</div>

			<div
				ref={ref}
				className="relative z-10 grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-center"
			>
				{/* Left: Profile with floating tags */}
				<div className="relative flex justify-center">
					<div className="relative">
						{/* Glow behind image */}
						<div className="absolute -inset-6 rounded-3xl bg-alvaro-primary/8 blur-2xl" />
						{/* Gradient border */}
						<div className="absolute -inset-[2px] rounded-3xl gradient-border -z-10" />
						<img
							src="/images/profile/profile.png"
							alt="Alvaro Garcia Macias"
							className={`relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-3xl border-2 border-alvaro-border transition-all duration-700 ${
								isVisible
									? "opacity-100 scale-100"
									: "opacity-0 scale-95"
							}`}
						/>
					</div>
					{/* Floating skill tags */}
					<div className="hidden md:block">
						<FloatingTags tags={profileTags} />
					</div>
				</div>

				{/* Right: Bio content */}
				<div className="space-y-6">
					<div>
						<p
							className={`text-sm font-semibold tracking-widest uppercase text-alvaro-primary mb-3 transition-all duration-500 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							About
						</p>
						<h2
							className={`text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.95] font-bold text-alvaro-white transition-all duration-700 delay-100 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-6"
							}`}
						>
							I build things
							<br />
							<span className="text-alvaro-muted">for the web.</span>
						</h2>
					</div>

					<WordReveal
						text={bioText}
						className="text-alvaro-muted leading-relaxed max-w-[55ch]"
					/>

					{/* Timeline slider */}
					<div
						className={`transition-all duration-700 delay-300 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4"
						}`}
					>
						<TimelineSlider
							value={slider}
							onChange={setSlider}
							min={0}
							max={data.length - 1}
						/>
					</div>

					{/* Inline stats */}
					<div
						className={`flex gap-8 pt-2 transition-all duration-700 delay-500 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4"
						}`}
					>
						<div>
							<span className="text-2xl md:text-3xl font-bold tracking-tight text-alvaro-white">
								5+
							</span>
							<p className="text-xs text-alvaro-muted mt-1">
								Years
							</p>
						</div>
						<div>
							<span className="text-2xl md:text-3xl font-bold tracking-tight text-alvaro-white">
								20+
							</span>
							<p className="text-xs text-alvaro-muted mt-1">
								Projects
							</p>
						</div>
						<div>
							<span className="text-2xl md:text-3xl font-bold tracking-tight text-alvaro-white">
								12
							</span>
							<p className="text-xs text-alvaro-muted mt-1">
								Technologies
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
