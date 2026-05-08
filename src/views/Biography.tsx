import { Content } from "src/components/Content";
import data from "src/data/biography.json";
import { type ChangeEvent, useEffect, useState } from "react";
import { TABLET } from "src/constants/devices";

export default function Biography() {
	const [isMobile, setIsMobile] = useState(true);
	const [slider, setSlider] = useState(Math.round((data.length - 1) / 2));
	const [selectedBio, setSelectedBio] = useState(data[slider]);

	useEffect(() => {
		setIsMobile(window.innerWidth < TABLET);
		const handleResize = () => setIsMobile(window.innerWidth < TABLET);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (slider < data.length) setSelectedBio(data[slider]);
	}, [slider]);

	const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
		setSlider(Number(e.target.value));
	};

	return (
		<section
			id="biography"
			className="md:min-h-[100dvh] grid items-center pt-24 md:pt-0"
		>
			<Content>
				<div className="grid grid-cols-1 md:gap-12 md:grid-cols-[1fr_2fr]">
					<div className="mb-5">
						<a
							href="https://linkedin.com/in/alvarogarciamacias"
							rel="noopener noreferrer"
							target="_blank"
							aria-label="LinkedIn profile"
						>
							<img
								src="/images/profile/profile.png"
								alt="Alvaro Garcia Macias"
								width={250}
								height={250}
								className="rounded-2xl border-2 border-alvaro-border hover:border-alvaro-primary cursor-pointer transition-colors duration-300"
							/>
						</a>
					</div>
					<div className="max-w-[65ch] md:h-[300px] items-center grid whitespace-pre-wrap">
						<div>
							<h1 className="mb-5 text-4xl md:text-5xl tracking-tighter leading-none font-semibold">
								Hello{" "}
								<span className="text-alvaro-primary">
									World
								</span>
							</h1>
							<p className="text-alvaro-muted leading-relaxed">
								My name is{" "}
								<span className="text-lg text-alvaro-white font-medium">
									Alvaro
								</span>
								, and I am a Full Stack Developer.
							</p>
							<div className="mt-4 text-alvaro-muted leading-relaxed">
								{selectedBio.bio}
							</div>
						</div>
					</div>
				</div>
				<div className="grid w-full grid-cols-2 mt-16 md:grid-cols-3 place-items-center gap-4">
					<button
						type="button"
						onClick={() =>
							slider !== 0 && setSlider((s) => s - 1)
						}
						className="p-2 border border-alvaro-border text-alvaro-muted rounded-lg hover:border-alvaro-primary hover:text-alvaro-primary transition-colors duration-200 active:scale-[0.97]"
					>
						Shortest
					</button>
					{!isMobile && (
						<div className="w-full px-4">
							<label htmlFor="bio-slider" className="sr-only">
								Biography length
							</label>
							<input
								id="bio-slider"
								type="range"
								min="0"
								max={data.length - 1}
								value={slider}
								onChange={handleSlider}
								className="w-full h-1 bg-alvaro-border rounded-lg appearance-none cursor-pointer accent-alvaro-primary"
							/>
						</div>
					)}
					<button
						type="button"
						onClick={() =>
							slider !== data.length - 1 &&
							setSlider((s) => s + 1)
						}
						className="p-2 border border-alvaro-border text-alvaro-muted rounded-lg hover:border-alvaro-primary hover:text-alvaro-primary transition-colors duration-200 active:scale-[0.97]"
					>
						Longest
					</button>
				</div>
			</Content>
		</section>
	);
}
