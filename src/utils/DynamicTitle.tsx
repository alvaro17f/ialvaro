import { useEffect, useState } from "react";

export const DynamicTitle = () => {
	const [isMobile, setIsMobile] = useState(true);
	const [title, setTitle] = useState("ialvaro");

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	});

	useEffect(() => {
		if (!isMobile) {
			const sections = [
				"home",
				"biography",
				"skills",
				"experience",
				"portfolio",
				"cv",
				"contact",
			];

			const scrollPosition = window.scrollY;

			if (scrollPosition === 0) {
				setTitle(`${sections[0]} - ialvaro`);
			}

			const updateTitle = () => {
				for (let i = 0; i < sections.length; i++) {
					const section = sections[i];
					const element = document.getElementById(section);
					if (element) {
						const elementPosition =
							element.getBoundingClientRect().top + (scrollPosition - 100);
						if (scrollPosition >= elementPosition) {
							setTitle(`${section} - ialvaro`);
						}
					}
				}
			};

			window.addEventListener("scroll", updateTitle);

			return () => {
				window.removeEventListener("scroll", updateTitle);
			};
		}
	}, [isMobile]);

	return <title>{title}</title>;
};
