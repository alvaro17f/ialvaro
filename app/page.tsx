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
	const [title, setTitle] = useState("[ iAlvaro ]");

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", updatePosition);

		if (window.innerWidth > 768) {
			if (scrollPosition < 700) {
				setTitle("Home - [ iAlvaro ]");
			} else if (scrollPosition < 1600) {
				setTitle("Biography - [ iAlvaro ]");
			} else if (scrollPosition < 2600) {
				setTitle("Skills - [ iAlvaro ]");
			} else if (scrollPosition < 4200) {
				setTitle("Experience - [ iAlvaro ]");
			} else if (scrollPosition < 4500) {
				setTitle("Resume - [ iAlvaro ]");
			} else if (scrollPosition >= 4500) {
				setTitle("Contact - [ iAlvaro ]");
			} else {
				setTitle("[ iAlvaro ]");
			}
		} else {
			setTitle("[ iAlvaro ]");
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
