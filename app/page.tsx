"use client";
import Scrollup from "@/components/Scrollup";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Biography from "./pages/Biography";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";

export default function Page() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [title, setTitle] = useState("AZAMA");

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", updatePosition);

		if (window.innerWidth > 768) {
			if (scrollPosition < 700) {
				setTitle("Home | AGM");
			} else if (scrollPosition < 1800) {
				setTitle("Biography | AGM");
			} else if (scrollPosition < 2800) {
				setTitle("Skills | AGM");
			} else if (scrollPosition < 4200) {
				setTitle("Experience | AGM");
			} else if (scrollPosition < 4500) {
				setTitle("Resume | AGM");
			} else if (scrollPosition >= 4500) {
				setTitle("Contact | AGM");
			} else {
				setTitle("AGM");
			}
		} else {
			setTitle("AGM");
		}

		return () => window.removeEventListener("scroll", updatePosition);
	});

	return (
		<>
			<title>{title}</title>
			{/* TODO: BACKGROUND WITH HTML ELEMENTS TRANSPARENT */}
			<Home />
			<Biography />
			<Skills />
			<Experience />
			{/* <Portfolio /> */}
			<Resume />
			<Contact />
			<Scrollup />
		</>
	);
}
