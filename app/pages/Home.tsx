import Wobble from "@/components/Wobble";

export default function Home() {
	return (
		<section
			id="home"
			className="h-[100dvh] top-0 grid place-items-center gap-5"
		>
			<div>
				<Wobble sentence="ALVARO" style="hover:text-azama-primary" />
				<Wobble sentence="GARCIA" style="hover:text-azama-danger" />
				<Wobble sentence="MACIAS" style="hover:text-azama-primary" />
			</div>
		</section>
	);
}
