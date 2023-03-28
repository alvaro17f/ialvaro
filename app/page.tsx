import Header from "@/components/Header";

import Parallax from "./parallax";

export const metadata = {
	title: "Home",
};

export default function Home() {
	return (
		<>
			<Header title={metadata.title} />
			<Parallax />
		</>
	);
}
