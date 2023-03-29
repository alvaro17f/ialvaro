import Header from "@/components/Header";
import Parallax from "@/app/portfolio/Parallax";
import Scrollup from "@/components/Scrollup";
import data from "@/data/portfolio.json";
import Link from "next/link";

export const metadata = {
	title: "Portfolio",
};

export default function Portfolio() {
	return (
		<>
			<Header title="Portfolio" />
			{data.map(({ id, title, image, url, description }) => {
				return (
					<Parallax key={id} url={url} title={title}>
						<img src={image} alt="hey" />
						<p>{description}</p>
					</Parallax>
				);
			})}
			<Scrollup />
		</>
	);
}
