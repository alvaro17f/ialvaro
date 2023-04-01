"use client";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Spinner from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
	const form = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const updateData = ({
		target,
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setData({
			...data,
			[target.name]: target.value,
		});
	};
	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (form.current === null) return;
		setIsSubmitting(true);
		emailjs
			.sendForm(
				process.env.NEXT_PUBLIC_SERVICE_ID,
				process.env.NEXT_PUBLIC_TEMPLATE_ID,
				form.current,
				process.env.NEXT_PUBLIC_PUBLIC_KEY,
			)
			.then(
				(result) => {
					toast.success(result.text);
					setIsSubmitting(false);
					setIsSubmitted(true);
				},
				(error) => {
					console.log(error.text);
					toast.error("ERROR");
					setIsSubmitting(false);
				},
			);
	};
	return (
		<section id="contact" className="h-[100dvh]">
			<div className="h-24 md:h-36" />
			<LazyMotion features={domAnimation}>
				<AnimatePresence mode="wait">
					{!isSubmitted ? (
						<m.section
							className="grid grid-cols-1 md:grid-cols-[1fr_2fr] place-items-center p-5 mb-5 rounded-xl text-azama-white border border-azama-muted"
							aria-label="section-form"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: false }}
							exit={{ opacity: 0 }}
							transition={{ ease: "easeInOut", duration: 1 }}
							key={`${isSubmitted}`}
						>
							<div className="mb-5 md:mb-0 md:text-center">
								<h2 className="mb-5 text-3xl">CONTACT ME!</h2>
								<div className="grid grid-cols-2 place-items-center">
									<a
										href="https://github.com/alvaro17f"
										target="_blank"
										rel="noreferrer"
									>
										<svg
											className="fill-azama-white hover:fill-azama-primary"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 64 64"
											width="48px"
											height="48px"
										>
											<path d="M 32 10 C 19.85 10 10 19.85 10 32 C 10 44.15 19.85 54 32 54 C 44.15 54 54 44.15 54 32 C 54 19.85 44.15 10 32 10 z M 32 14 C 41.941 14 50 22.059 50 32 C 50 40.238706 44.458716 47.16934 36.904297 49.306641 C 36.811496 49.1154 36.747844 48.905917 36.753906 48.667969 C 36.784906 47.458969 36.753906 44.637563 36.753906 43.601562 C 36.753906 41.823563 35.628906 40.5625 35.628906 40.5625 C 35.628906 40.5625 44.453125 40.662094 44.453125 31.246094 C 44.453125 27.613094 42.554688 25.720703 42.554688 25.720703 C 42.554688 25.720703 43.551984 21.842266 42.208984 20.197266 C 40.703984 20.034266 38.008422 21.634812 36.857422 22.382812 C 36.857422 22.382813 35.034 21.634766 32 21.634766 C 28.966 21.634766 27.142578 22.382812 27.142578 22.382812 C 25.991578 21.634813 23.296016 20.035266 21.791016 20.197266 C 20.449016 21.842266 21.445312 25.720703 21.445312 25.720703 C 21.445312 25.720703 19.546875 27.611141 19.546875 31.244141 C 19.546875 40.660141 28.371094 40.5625 28.371094 40.5625 C 28.371094 40.5625 27.366329 41.706312 27.265625 43.345703 C 26.675939 43.553637 25.872132 43.798828 25.105469 43.798828 C 23.255469 43.798828 21.849984 42.001922 21.333984 41.169922 C 20.825984 40.348922 19.7845 39.660156 18.8125 39.660156 C 18.1725 39.660156 17.859375 39.981656 17.859375 40.347656 C 17.859375 40.713656 18.757609 40.968484 19.349609 41.646484 C 20.597609 43.076484 20.574484 46.292969 25.021484 46.292969 C 25.547281 46.292969 26.492043 46.171872 27.246094 46.068359 C 27.241926 47.077908 27.230199 48.046135 27.246094 48.666016 C 27.251958 48.904708 27.187126 49.114952 27.09375 49.306641 C 19.540258 47.168741 14 40.238046 14 32 C 14 22.059 22.059 14 32 14 z" />
										</svg>
									</a>
									<a
										href="https://linkedin.com/in/alvarogarciamacias"
										target="_blank"
										rel="noreferrer"
									>
										<svg
											className="fill-azama-white hover:fill-azama-primary"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 64 64"
											width="48px"
											height="48px"
										>
											<path d="M 23.773438 12 C 12.855437 12 12 12.854437 12 23.773438 L 12 40.226562 C 12 51.144563 12.855438 52 23.773438 52 L 40.226562 52 C 51.144563 52 52 51.145563 52 40.226562 L 52 23.773438 C 52 12.854437 51.145563 12 40.226562 12 L 23.773438 12 z M 21.167969 16 L 42.832031 16 C 47.625031 16 48 16.374969 48 21.167969 L 48 42.832031 C 48 47.625031 47.624031 48 42.832031 48 L 21.167969 48 C 16.374969 48 16 47.624031 16 42.832031 L 16 21.167969 C 16 16.374969 16.374969 16 21.167969 16 z M 22.501953 18.503906 C 20.872953 18.503906 19.552734 19.824172 19.552734 21.451172 C 19.552734 23.078172 20.871953 24.400391 22.501953 24.400391 C 24.126953 24.400391 25.447266 23.079172 25.447266 21.451172 C 25.447266 19.826172 24.126953 18.503906 22.501953 18.503906 z M 37.933594 26.322266 C 35.473594 26.322266 33.823437 27.672172 33.148438 28.951172 L 33.078125 28.951172 L 33.078125 26.728516 L 28.228516 26.728516 L 28.228516 43 L 33.28125 43 L 33.28125 34.949219 C 33.28125 32.826219 33.687359 30.771484 36.318359 30.771484 C 38.912359 30.771484 38.945312 33.200891 38.945312 35.087891 L 38.945312 43 L 44 43 L 44 34.074219 C 44 29.692219 43.054594 26.322266 37.933594 26.322266 z M 19.972656 26.728516 L 19.972656 43 L 25.029297 43 L 25.029297 26.728516 L 19.972656 26.728516 z" />
										</svg>
									</a>
								</div>
							</div>
							<form
								ref={form}
								onSubmit={submit}
								className="grid gap-5 p-2 place-items-center md:w-full"
								aria-label="contact-form"
							>
								<input
									type="text"
									name="name"
									value={data.name}
									onChange={updateData}
									placeholder="Name *"
									aria-label="name"
									className="bg-azama-base placeholder:text-azama-danger text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-5  border focus:border-azama-danger border-azama-muted rounded-xl focus:outline-none"
									required
								/>
								<input
									type="email"
									name="email"
									value={data.email}
									onChange={updateData}
									placeholder="Email *"
									aria-label="email"
									className="bg-azama-base placeholder:text-azama-danger text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-5  border border-azama-muted rounded-xl focus:outline-none focus:border-azama-danger"
									required
								/>
								<input
									type="text"
									name="phone"
									value={data.phone}
									onChange={updateData}
									placeholder="Phone"
									aria-label="phone"
									className="bg-azama-base placeholder:text-azama-muted text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-5 border border-azama-muted rounded-xl focus:border-azama-primary focus:outline-none"
								/>
								<textarea
									className="bg-azama-base text-azama-white max-w-[15rem] md:w-[42rem] md:max-w-none p-8 border border-azama-muted focus:border-azama-danger rounded-xl placeholder:text-azama-danger focus:outline-none"
									name="message"
									value={data.message}
									onChange={updateData}
									placeholder="Your message goes here... *"
									aria-label="message"
									required
								/>
								<m.button
									className="p-0 m-5 text-5xl rounded-full shadow-md md:w-40 shadow-azama-base bg-azama-base"
									type="submit"
									aria-label="submit"
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									{isSubmitting ? <Spinner /> : "🔥"}
								</m.button>
							</form>
						</m.section>
					) : (
						<m.section
							className="grid grid-cols-1 p-5 mb-5 border rounded-xl border-azama-muted place-items-center text-azama-white"
							aria-label="form"
							initial={{ opacity: 0, scale: 0.7 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ ease: "easeInOut", duration: 1 }}
							key={`${isSubmitted}`}
						>
							<h3 className="text-3xl">
								Thank you!{" "}
								<span className="[text-shadow:_0_3px_0_rgb(35_33_54_/_50%)]">
									😀
								</span>
							</h3>
							<p>Your message has been sent.</p>
						</m.section>
					)}
				</AnimatePresence>
			</LazyMotion>
			<div className="h-28" />
			<Toaster position="bottom-left" reverseOrder={false} />
		</section>
	);
}
