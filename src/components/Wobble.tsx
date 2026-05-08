import { useState } from "react";
import {
	m,
	LazyMotion,
	domAnimation,
	useAnimationControls,
} from "framer-motion";

const Text = ({ children }: { children: React.ReactNode }) => {
	const controls = useAnimationControls();
	const [isPlaying, setIsPlaying] = useState(false);

	const rubberBand = () => {
		controls.start({
			transform: [
				"scale3d(1, 1, 1)",
				"scale3d(1.4, 0.55, 1)",
				"scale3d(0.75, 1.25, 1)",
				"scale3d(1.25, 0.85, 1)",
				"scale3d(0.9, 1.05, 1)",
				"scale3d(1, 1, 1)",
			],
			transition: {
				times: [0, 0.4, 0.6, 0.7, 0.8, 0.9],
			},
		});
		setIsPlaying(true);
	};

	return (
		<LazyMotion features={domAnimation}>
			<m.span
				className="inline-block cursor-default text-6xl md:text-8xl tracking-tighter leading-none font-bold text-alvaro-white hover:text-alvaro-primary transition-colors duration-200"
				animate={controls}
				onMouseOver={() => !isPlaying && rubberBand()}
				onAnimationComplete={() => setIsPlaying(false)}
				aria-label="wobble"
			>
				{children}
			</m.span>
		</LazyMotion>
	);
};

type Props = {
	sentence: string;
};

export const Wobble = ({ sentence }: Props) => {
	return (
		<>
			{sentence.split("").map((letter, i) => (
				<Text key={`${sentence}-${i}`}>
					{letter === " " ? "\u00A0" : letter}
				</Text>
			))}
			<br />
		</>
	);
};
