import { FloatingTags } from "src/components/FloatingTags";
import { useScrollReveal } from "src/hooks/useScrollReveal";
import data from "src/data/biography.json";

const profileTags = [
	"React",
	"TypeScript",
	"Node.js",
	"Full Stack",
	"UI/UX",
];

const selectedBio = data[2];

export default function Biography() {
	const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

	const paragraphs: string[] = selectedBio.bio
		.split("\n")
		.filter(Boolean);

	return (
		<section
			id="biography"
			className="relative min-h-[100dvh] grid items-center overflow-hidden py-24 md:py-32"
		>
			{/* Atmospheric layers */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 -right-1/3 w-[700px] h-[700px] rounded-full bg-alvaro-primary/3 blur-[150px]" />
				<div className="absolute bottom-0 -left-1/3 w-[600px] h-[600px] rounded-full bg-alvaro-primary/2 blur-[130px]" />
			</div>

			<div
				ref={ref}
				className="relative z-10 grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 items-center max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
			>
				{/* Left: Profile with floating tags */}
				<div className="relative flex justify-center">
					<div className="relative">
						<div className="absolute -inset-8 rounded-3xl bg-alvaro-primary/6 blur-3xl" />
						<div className="absolute -inset-[2px] rounded-3xl gradient-border -z-10 opacity-60" />
						<img
							src="/images/profile/profile.png"
							alt="Alvaro Garcia Macias"
							className={`relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-3xl transition-all duration-700 ${
								isVisible
									? "opacity-100 scale-100"
									: "opacity-0 scale-90"
							}`}
							style={{ border: "1px solid rgba(212,168,83,0.12)" }}
						/>
						<div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-alvaro-primary/40 rounded-tr-lg" />
					</div>
					<div className="hidden md:block">
						<FloatingTags tags={profileTags} />
					</div>
				</div>

				{/* Right: Editorial spread */}
				<div className="space-y-12">
					{/* Header */}
					<div className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="w-10 h-px bg-alvaro-primary/50" />
							<span className="text-[11px] tracking-[0.25em] uppercase text-alvaro-primary/60 font-medium">
								About me
							</span>
						</div>

						<h2
							className={`text-4xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.88] font-bold transition-all duration-700 delay-100 ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<span className="text-alvaro-white">I build</span>
							<br />
							<span className="text-alvaro-muted">things for</span>
							<br />
							<span className="text-alvaro-primary">the web.</span>
						</h2>
					</div>

					{/* Description — refined paragraphs */}
					<div
						className={`space-y-5 transition-all duration-700 delay-200 ${
							isVisible
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-4"
						}`}
					>
						{paragraphs.map((text, i) => (
							<p
								key={`p-${i}`}
								className="text-alvaro-muted/80 leading-relaxed text-[15px] md:text-base max-w-[55ch]"
							>
								{i === 0 && (
									<span className="float-left text-5xl md:text-6xl font-bold text-alvaro-primary/20 leading-[0.7] mr-2.5 mt-1">
										&ldquo;
									</span>
								)}
								{text}
							</p>
						))}
					</div>

					{/* Stats — blueprint annotations */}
					<div
						className={`grid grid-cols-3 gap-8 pt-4 transition-all duration-700 delay-500 ${
							isVisible
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-6"
						}`}
					>
						<div className="space-y-2">
							<div className="flex items-baseline gap-1">
								<span className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-alvaro-primary">
									5
								</span>
								<span className="text-2xl text-alvaro-primary/50">+</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-px bg-alvaro-primary/30" />
								<p className="text-[11px] tracking-[0.15em] uppercase text-alvaro-muted/50">
									Years
								</p>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-baseline gap-1">
								<span className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-alvaro-primary">
									20
								</span>
								<span className="text-2xl text-alvaro-primary/50">+</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-px bg-alvaro-primary/30" />
								<p className="text-[11px] tracking-[0.15em] uppercase text-alvaro-muted/50">
									Projects
								</p>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-baseline gap-1">
								<span className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-alvaro-primary">
									12
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-px bg-alvaro-primary/30" />
								<p className="text-[11px] tracking-[0.15em] uppercase text-alvaro-muted/50">
									Technologies
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
