import Wobble from "src/components/Wobble";

export default function Home() {
	return (
		<section
			id="home"
			className="h-[100dvh] top-0 grid place-items-center gap-5"
		>
			<div>
				<Wobble sentence="ALVARO" style="hover:text-alvaro-primary" />
				<Wobble sentence="GARCIA" style="hover:text-alvaro-danger" />
				<Wobble sentence="MACIAS" style="hover:text-alvaro-primary" />
			</div>
		</section>
	);
}
