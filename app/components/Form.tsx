"use client";
import "animate.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Form() {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"YOUR_SERVICE_ID",
				"YOUR_TEMPLATE_ID",
				form.current,
				"YOUR_PUBLIC_KEY",
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				},
			);
	};

	return (
		<>
			<section
				className="grid grid-cols-1 md:grid-cols-[1fr_2fr] place-items-center p-5 mb-5 rounded-lg text-azama-text-dark bg-azama-warning animate__animated animate__fadeInLeft animate__delay-0.7s"
				aria-label="form"
			>
				<div className="md:text-center">
					<h2 className="text-3xl">CONTACT ME!</h2>
					<p>It's free</p>
				</div>
				<form
					ref={form}
					onSubmit={sendEmail}
					className="grid gap-5 p-2 place-items-center md:w-full"
				>
					<input
						className="opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
						type="text"
						name="name"
						placeholder="Name"
						required
					/>
					<input
						className="opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-5 shadow-md rounded-xl shadow-azama-base"
						type="email"
						name="email"
						placeholder="Email"
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
						placeholder="Your message goes here..."
					/>
					<button
						className="active:bg-azama-success opacity-80 max-w-[15rem] md:w-[42rem] md:max-w-none p-5 rounded-xl shadow-md shadow-azama-base bg-azama-danger"
						type="submit"
					>
						Send
					</button>
				</form>
			</section>
		</>
	);
}
