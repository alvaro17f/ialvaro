"use client";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";

export default function Contact() {
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
	const submit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		setIsSubmitting(true);

		setInterval(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
		}, 1000);
	};
	return (
		<section id="contact" className="h-[100dvh]">
			<div className="h-24 md:h-36" />
			<LazyMotion features={domAnimation}>
				<AnimatePresence mode="wait">
					{!isSubmitted ? (
						<m.section
							className="grid md:grid-cols-[1fr_2fr] place-items-center p-5 mb-5 rounded-xl text-azama-white border border-azama-muted"
							aria-label="section-form"
							initial={{ x: -70, opacity: 0, scale: 0.7 }}
							whileInView={{ x: 0, opacity: 1, scale: 1 }}
							viewport={{ once: true }}
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
										<img
											src="/social/github.svg"
											alt="github"
											className="w-10 h-10"
										/>
									</a>
									<a
										href="https://linkedin.com/in/alvarogarciamacias"
										target="_blank"
										rel="noreferrer"
									>
										<img
											src="/social/linkedin.svg"
											alt="linkedin"
											className="w-10 h-10"
										/>
									</a>
								</div>
							</div>
							<form
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
							<p>
								Your message has been received. Please check your email for
								confirmation.
							</p>
						</m.section>
					)}
				</AnimatePresence>
			</LazyMotion>
			<div className="h-28" />
		</section>
	);
}
