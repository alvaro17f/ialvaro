"use client";
import "animate.css";
import { FormEvent, useState } from "react";
import Spinner from "@/app/components/Spinner";

export default function Form() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsSubmitting(true);

		setInterval(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
		}, 2000);
	};
	return (
		<>
			{!isSubmitted ? (
				<section
					className="grid grid-cols-1 md:grid-cols-[1fr_2fr] place-items-center p-5 mb-5 rounded-lg text-azama-dark bg-azama-warning animate__animated animate__fadeInLeft animate__delay-0.7s"
					aria-label="form"
				>
					<div className="mb-5 md:mb-0 md:text-center">
						<h2 className="text-3xl">CONTACT ME!</h2>
						<p>It's free</p>
					</div>
					<form
						onSubmit={onSubmit}
						className="grid gap-5 p-2 place-items-center md:w-full"
					>
						<input
							className="bg-azama-base placeholder:text-azama-danger text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
							type="text"
							name="name"
							placeholder="Name *"
							required
						/>
						<input
							className="bg-azama-base placeholder:text-azama-danger text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
							type="email"
							name="email"
							placeholder="Email *"
							required
						/>
						<input
							className="bg-azama-base placeholder:text-azama-muted text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
							type="text"
							name="phone"
							placeholder="Phone"
						/>
						<textarea
							className="bg-azama-base text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-8 shadow-md rounded-xl shadow-azama-base placeholder:text-azama-danger"
							placeholder="Your message goes here... *"
							required
						/>
						<button
							className={`md:w-40  p-4 rounded-full shadow-md shadow-azama-danger bg-azama-base bg-opacity-100 active:bg-opacity-50 text-5xl ${
								isSubmitting && "animate__animated animate__rubberBand"
							}`}
							type="submit"
						>
							{isSubmitting ? <Spinner /> : "🔥"}
						</button>
					</form>
				</section>
			) : (
				<section
					className="grid grid-cols-1 place-items-center p-5 mb-5 rounded-lg text-azama-dark bg-azama-warning animate__animated animate__fadeInLeft animate__delay-0.7s"
					aria-label="form"
				>
					<h3 className="text-3xl">
						Thank you!{" "}
						<span className="[text-shadow:_0_3px_0_rgb(35_33_54_/_50%)]">
							😀
						</span>
					</h3>
					<p>
						Your message has been received. Please check your email for
						confirmation.
					</p>
				</section>
			)}
		</>
	);
}
