import { useEffect, useState } from "react";

const sections = [
	"home",
	"biography",
	"skills",
	"experience",
	"portfolio",
	"cv",
	"contact",
];

export const DynamicTitle = () => {
	const [title, setTitle] = useState("ialvaro");

	useEffect(() => {
		const updateTitle = () => {
			const scrollY = window.scrollY;

			if (scrollY < 100) {
				setTitle("home - ialvaro");
				return;
			}

			for (let i = sections.length - 1; i >= 0; i--) {
				const el = document.getElementById(sections[i]);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= 150) {
						setTitle(`${sections[i]} - ialvaro`);
						return;
					}
				}
			}
		};

		updateTitle();
		window.addEventListener("scroll", updateTitle, { passive: true });
		return () => window.removeEventListener("scroll", updateTitle);
	}, []);

	return <title>{title}</title>;
};
