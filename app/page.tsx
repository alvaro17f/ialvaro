"use client";
import Scrollup from "@/components/Scrollup";
import LazyView from "@/components/LazyView";
import Content from "@/components/Content";
import Wobble from "@/components/Wobble";

// export const metadata = {
// 	title: "Home",
// };

export default function Home() {
	return (
		<>
			<title>Home | AZAMA</title>
			{/* TODO: BACKGROUND WITH HTML ELEMENTS TRANSPARENT */}
			<section className="h-[100dvh] top-0 grid place-items-center gap-5">
				<div>
					<Wobble sentence="ALVARO" style="hover:text-azama-primary" />
					<Wobble sentence="GARCIA" style="hover:text-azama-danger" />
					<Wobble sentence="MACIAS" style="hover:text-azama-primary" />
				</div>
			</section>
			<LazyView once={false}>
				<div className="grid grid-cols-2 gap-5 divide-x h-[100dvh]">
					<Content duration={1.2} bg="bg-azama-white" text="dark">
						A
					</Content>
					<Content duration={1.2} bg="bg-azama-white" text="dark">
						B
					</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x h-[100dvh]">
					<Content duration={1.2} bg="bg-azama-white" text="dark">
						A
					</Content>
					<Content duration={1.2} bg="bg-azama-white" text="dark">
						B
					</Content>
				</div>
			</LazyView>
			<Scrollup />
		</>
	);
}
