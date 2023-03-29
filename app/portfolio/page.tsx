import Header from "@/components/Header";
import Parallax from "@/components/Parallax";
import Scrollup from "@/components/Scrollup";

export const metadata = {
	title: "Portfolio",
};

export default function Portfolio() {
	return (
		<>
			<Header title="Portfolio" />
			<Parallax title="HEY">
				<div>
					<img src="/parallax/1.jpg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>

			<Parallax title="YOU">
				<div>
					<img src="/parallax/2.jpg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>

			<Parallax>
				<div>
					<img src="/parallax/3.jpg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>

			<Parallax>
				<div>
					<img src="/parallax/4.jpg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>

			<Parallax>
				<div>
					<img src="/parallax/5.jpg" alt="hey" />
					<p>HELLO</p>
				</div>
			</Parallax>
			<Scrollup />
		</>
	);
}
