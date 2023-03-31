"use client";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "@/components/Spinner";

type Props = {
	duration?: number;
};

export default function Form({ duration = 1 }: Props) {
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
		<>
			<LazyMotion features={domAnimation}>
				<AnimatePresence mode="wait">
					{!isSubmitted ? (
						<m.section
							className="grid grid-cols-1 md:grid-cols-[1fr_2fr] place-items-center p-5 mb-5 rounded-lg text-azama-white border border-azama-muted"
							aria-label="section-form"
							initial={{ x: -70, opacity: 0, scale: 0.7 }}
							whileInView={{ x: 0, opacity: 1, scale: 1 }}
							viewport={{once: true}}
							exit={{ opacity: 0 }}
							transition={{ ease: "easeInOut", duration }}
							key={`${isSubmitted}`}
						>
							<div className="mb-5 md:mb-0 md:text-center">
								<h2 className="text-3xl">CONTACT ME!</h2>
								<p>It's free</p>
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
							className="grid grid-cols-1 p-5 mb-5 rounded-lg place-items-center text-azama-dark bg-azama-white"
							aria-label="form"
							initial={{ opacity: 0, scale: 0.7 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ ease: "easeInOut", duration }}
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
		</>
	);
}
