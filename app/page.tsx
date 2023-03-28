import Header from "@/components/Header";

import Parallax from "./parallax";
import Scrollup from "@/components/Scrollup";

export const metadata = {
	title: "Home",
};

export default function Home() {
	return (
		<>
			<Header title={metadata.title} />
			<Parallax />
			<Scrollup />
		</>
	);
}
