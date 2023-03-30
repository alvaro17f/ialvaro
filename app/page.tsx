"use client";
import Header from "@/components/Header";
import Scrollup from "@/components/Scrollup";
import LazyView from "@/components/LazyView";
import Content from "@/components/Content";

// export const metadata = {
// 	title: "Home",
// };

export default function Home() {
	return (
		<>
			<title>Home | AZAMA</title>
			<Header title="Home" />
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
