import Header from "@/components/Header";
import Parallax from "@/components/parallax";
import Scrollup from "@/components/Scrollup";

export const metadata = {
	title: "Portfolio",
};

export default function Portfolio() {
	return (
		<>
			<Header title="Portfolio" />
			<Parallax>
				<div>
					<img src="/images/azama_full.svg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>

			<Parallax>
				<div>
					<img src="/images/azama_full.svg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>
			<Scrollup />
		</>
	);
}
