"use client";
import Scrollup from "@/components/Scrollup";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Bio from "./pages/Biography";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

export default function Page() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [title, setTitle] = useState("AZAMA");

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", updatePosition);

		if (scrollPosition < 700) {
			setTitle("Home");
		} else if (scrollPosition > 10) {
			setTitle("AZAMA");
		} else {
			setTitle("AZAMA");
		}

		return () => window.removeEventListener("scroll", updatePosition);
	});

	return (
		<>
			<title>{title}</title>
			{/* TODO: BACKGROUND WITH HTML ELEMENTS TRANSPARENT */}
			<Home />
			<Bio />
			<Experience />
			<Portfolio />
			<Contact />
			<Scrollup />
		</>
	);
}
