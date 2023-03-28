import PortfolioParallax from "@/app/portfolio/parallax";
import Scrollup from "@/components/Scrollup";

export const metadata = {
	title: "Portfolio",
};

export default function Portfolio() {
	return (
		<>
			<PortfolioParallax />;
			<Scrollup />
		</>
	);
}
