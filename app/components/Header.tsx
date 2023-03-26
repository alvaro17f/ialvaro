"use client";
import "animate.css";

export default function Header({ value }: { value: string }) {
	return (
		<>
			<section className="p-5 mb-5 rounded-lg text-azama-text-dark bg-azama-primary animate__animated animate__jackInTheBox">
				<h1 className="text-7xl animate__animated animate__fadeIn animate__delay-0.7s">
					{value}
				</h1>
			</section>
		</>
	);
}
