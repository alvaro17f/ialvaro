"use client";
import { useEffect, useState } from "react";
import Home from "@/app/page";
import About from "@/app/about/page";

export default function PortfolioComponent() {
	const [currentElement, changeCurrentElement] = useState("Home");
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", (e) => {
			setWidth(window.innerWidth);
		});
		return () => {
			window.removeEventListener("resize", () => {
				console.log("removed");
			});
		};
	}, [currentElement]);

	const changeElement = (scrollPercentage: number) => {
		//.31 .47 .62 .98 threshold to change the element
		// element will change according to scroll percentage

		const p = Math.round(scrollPercentage * 100);
		if (p > 31 && p < 47) {
			changeCurrentElement(() => "About");
		} else if (p >= 47 && p < 62) {
			changeCurrentElement(() => "Skills");
		} else if (p >= 62 && p < 98) {
			changeCurrentElement(() => "Projects");
		} else if (p >= 95) {
			changeCurrentElement(() => "Contact");
		} else {
			changeCurrentElement("Home");
		}
	};

	const element = () => {
		switch (currentElement) {
			case "Home":
				return (
					<>
						<Home />
					</>
				);
			case "About":
				return (
					<>
						<About />
					</>
				);
			case "Skills":
				return <>{/* <Skills width={width} /> */}</>;
			case "Projects":
				return <>{/* <Projects width={width} /> */}</>;
			case "Contact":
				return <>{/* <Contact width={width} /> */}</>;
			default:
				return null;
		}
	};
	return (
		<>
			{width < 800 ? (
				<div key={currentElement} className='page-head'>
					<h1>{currentElement}</h1>
				</div>
			) : null}
		</>
	);
}
