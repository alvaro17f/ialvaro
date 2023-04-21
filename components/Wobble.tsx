"use client";
import React, { useId, useState } from "react";
import {
	m,
	LazyMotion,
	domAnimation,
	useAnimationControls,
} from "framer-motion";

const Text = ({
	children,
	style,
}: { children: React.ReactNode; style?: string }) => {
	const controls = useAnimationControls();
	const [isPlaying, setIsPlaying] = useState(false);

	const rubberBand = () => {
		controls.start({
			transform: [
				"scale3d(1, 1, 1)",
				"scale3d(1.4, .55, 1)",
				"scale3d(.75, 1.25, 1)",
				"scale3d(1.25, .85, 1)",
				"scale3d(.9, 1.05, 1)",
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
				className={`inline-block cursor-default text-6xl md:text-9xl ${style}`}
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
	style?: string;
};

export default function Wobble({ sentence, style }: Props) {
	const uuid = useId();

	return (
		<>
			{sentence.split("").map((letter, index) => {
				return (
					<Text style={style} key={`${uuid}-${index}`}>
						{letter === " " ? "\u00A0" : letter}
					</Text>
				);
			})}
			<br />
		</>
	);
}
