import Header from "@/components/Header";

import Parallax from "./parallax";
import Scrollup from "@/components/Scrollup";

export const metadata = {
	title: "Home | AZAMA",
};

export default function Home() {
	return (
		<>
			<Header title="Home" />
			<Parallax />
			<Scrollup />
		</>
	);
}
