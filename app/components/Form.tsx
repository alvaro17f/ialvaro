"use client";
import "animate.css";

export default function Form() {
	return (
		<>
			<section
				className="grid grid-cols-1 md:grid-cols-[1fr_2fr] place-items-center p-5 mb-5 rounded-lg text-azama-dark bg-azama-secondary  animate__animated animate__fadeInLeft animate__delay-0.7s"
				aria-label="form"
			>
				<div className="mb-5 md:mb-0 md:text-center">
					<h2 className="text-3xl">CONTACT ME!</h2>
					<p>It's free</p>
				</div>
				<form className="grid gap-5 p-2 place-items-center md:w-full">
					<input
						className="opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
						type="text"
						name="name"
						placeholder="Name *"
						required
					/>
					<input
						className="opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
						type="email"
						name="email"
						placeholder="Email *"
						required
					/>
					<input
						className="opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
						type="text"
						name="phone"
						placeholder="Phone"
					/>
					<textarea
						className="opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-8 shadow-md rounded-xl shadow-azama-base"
						placeholder="Your message goes here... *"
						required
					/>
					<button
						className="opacity-80 max-w-[15rem] md:w-[12rem] md:max-w-none p-5 rounded-xl shadow-md shadow-azama-base bg-azama-success bg-opacity-100 active:bg-opacity-50 text-5xl"
						type="submit"
					>
						🔥
					</button>
				</form>
			</section>
		</>
	);
}
