import Header from "@/app/components/Header";
import Content from "@/app/components/Content";

export default function Home() {
	return (
		<>
			<Header value="Home" />
			<Content>
				<div className="grid grid-cols-1 place-items-center">
					<h2 className="text-3xl">Hello World!</h2>
				</div>
			</Content>
		</>
	);
}
