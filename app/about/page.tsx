import Content from "../components/Content";
import Header from "../components/Header";

export const metadata = {
	title: "About",
};

export default function About() {
	return (
		<>
			<Header value={metadata.title} />
			<Content>
				<p>Hello, my name is Álvaro, I'm a web developer.</p>
			</Content>
		</>
	);
}
