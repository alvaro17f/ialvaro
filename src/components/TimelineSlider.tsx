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

	return (
		<div className="space-y-3">
			<div className="flex justify-between text-xs text-alvaro-muted font-medium">
				<span>Short</span>
				<span>Long</span>
			</div>
			<div className="relative">
				<input
					type="range"
					min={min}
					max={max}
					value={value}
					onChange={handleChange}
					className="w-full h-1 bg-alvaro-border rounded-full appearance-none cursor-pointer accent-alvaro-primary relative z-10"
					aria-label="Bio length"
				/>
			</div>
			<div className="flex justify-between px-1">
				{dots.map((i) => (
					<div
						key={i}
						className={`w-2 h-2 rounded-full transition-all duration-300 ${
							i <= value
								? "bg-alvaro-primary scale-110"
								: "bg-alvaro-border"
						}`}
					/>
				))}
			</div>
		</div>
	);
};
