import { type ChangeEvent } from "react";

type Props = {
	value: number;
	onChange: (value: number) => void;
	min: number;
	max: number;
};

export const TimelineSlider = ({
	value,
	onChange,
	min,
	max,
}: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(Number(e.target.value));
	};

	const dots = Array.from({ length: max - min + 1 }, (_, i) => i);
	const percentage = ((value - min) / (max - min)) * 100;

	return (
		<div className="space-y-4 pt-2">
			{/* Labels with wide spacing */}
			<div className="flex items-center justify-between text-xs text-alvaro-muted font-medium px-1">
				<span>Short</span>
				<span>Long</span>
			</div>

			{/* Slider */}
			<div className="relative h-6 flex items-center">
				{/* Track background */}
				<div className="absolute inset-x-0 h-[3px] bg-alvaro-border rounded-full" />
				{/* Track fill */}
				<div
					className="absolute left-0 h-[3px] bg-alvaro-primary rounded-full transition-[width] duration-300 ease-out"
					style={{ width: `${percentage}%` }}
				/>
				{/* Input */}
				<input
					type="range"
					min={min}
					max={max}
					value={value}
					onChange={handleChange}
					className="timeline-slider absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
					aria-label="Bio length"
				/>
				{/* Thumb */}
				<div
					className="absolute w-4 h-4 bg-alvaro-primary rounded-full border-2 border-alvaro-base shadow-lg transition-[left] duration-300 ease-out pointer-events-none"
					style={{ left: `calc(${percentage}% - 8px)` }}
				/>
			</div>

			{/* Dots */}
			<div className="flex justify-between px-1">
				{dots.map((i) => (
					<div
						key={i}
						className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
							i <= value
								? "bg-alvaro-primary"
								: "bg-alvaro-border"
						}`}
					/>
				))}
			</div>
		</div>
	);
};
