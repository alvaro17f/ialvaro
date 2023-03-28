import Content from "@/components/Content";
import Header from "@/components/Header";

export const metadata = {
	title: "Home",
};

export default function Home() {
	return (
		<>
			<Header title={metadata.title} />
			<div className="grid grid-cols-2 gap-5 divide-x">
				<Content duration={1.2}>A</Content>
				<Content>B</Content>
			</div>
		</>
	);
}
