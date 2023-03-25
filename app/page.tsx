import Header from "@/app/components/Header";
import Content from "./components/Content";

export default function Home() {
	return (
		<>
			<Header value="Home" />
			<Content >
				<img src="next.svg" alt="next logo" />
				<br />
				<p>HOLA</p>
			</Content>
		</>
	);
}
