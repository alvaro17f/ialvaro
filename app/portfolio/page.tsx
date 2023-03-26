import Content from "../components/Content";
import Header from "../components/Header";

export const metadata = {
	title: "Portfolio",
};

export default function Portfolio() {
	return (
		<>
			<Header value={metadata.title} />
			<div className="grid grid-cols-2 gap-5 divide-x">
				<Content>A</Content>
				<Content>B</Content>
			</div>
		</>
	);
}
