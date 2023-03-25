import Header from "../components/Header";

export const metadata = {
	title: "About",
};

export default function About() {
	return (
		<>
			<Header value={metadata.title} />
		</>
	);
}
