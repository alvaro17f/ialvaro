import { Content } from "src/components/Content";
import data from "src/data/biography.json";
import { type ChangeEvent, useEffect, useState } from "react";

export default function Biography() {
	const [isMobile, setIsMobile] = useState(true);
	const [slider, setSlider] = useState(Math.round((data.length - 1) / 2));
	const [selectedBio, setSelectedBio] = useState(data[slider]);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	});

	useEffect(() => {
		if (slider < data.length) {
			setSelectedBio(data[slider]);
		}
	}, [slider]);

	const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
		setSlider(Number(e.target.value));
	};

	return (
		<section
			id="biography"
			className="md:h-[100dvh] grid items-center pt-24 md:pt-0"
		>
			<Content>
				<div className="grid grid-cols-1 md:gap-10 md:grid-cols-[1fr_2fr]">
					<div className="mb-5">
						<a
							href="https://linkedin.com/in/alvarogarciamacias"
							rel="noopener noreferrer"
							target="_blank"
						>
							<img
								src="/images/profile/profile.png"
								alt="profile"
								width={250}
								height={250}
								className="border-[7px] rounded-full border-alvaro-white hover:border-dashed cursor-pointer"
							/>
						</a>
					</div>
					<div className="max-w-[75ch] md:h-[300px] items-center md:text-justify grid  whitespace-pre-wrap">
						<div>
							<h1 className="mb-5 text-4xl">
								Hello <span className="text-alvaro-danger">World</span>!
							</h1>
							<p>
								My name is{" "}
								<span className="text-xl text-alvaro-primary">Álvaro</span>, and
								I am a Full Stack Developer.
							</p>
							{selectedBio.bio}
						</div>
					</div>
				</div>
				<div className="grid w-full grid-cols-2 mt-20 md:grid-cols-3 place-items-center">
					<button
						type="button"
						onClick={() => slider !== 0 && setSlider((slider) => slider - 1)}
						className="p-2 border text-alvaro-primary rounded-xl border-alvaro-primary md:hover:bg-alvaro-primary md:hover:text-alvaro-base"
					>
						Shortest
					</button>
					{!isMobile && (
						<input
							id="minmax-range"
							type="range"
							min="0"
							max={data.length - 1}
							value={slider}
							onChange={handleSlider}
							className="w-full h-2 bg-gray-200 rounded-lg outline-none appearance-none cursor-pointer dark:bg-gray-700"
						/>
					)}
					<button
						type="button"
						onClick={() =>
							slider !== data.length - 1 && setSlider((slider) => slider + 1)
						}
						className="p-2 border text-alvaro-danger rounded-xl border-alvaro-danger md:hover:bg-alvaro-danger md:hover:text-alvaro-base"
					>
						Longest
					</button>
				</div>
			</Content>
		</section>
	);
}
