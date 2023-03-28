"use client";
import LazyView from "@/components/LazyView";
// import About from "@/app/about/page";
import Content from "@/components/Content";

export default function Parallax() {
	return (
		<>
			{/* <LazyView>
				<About />
			</LazyView>

			<LazyView>
				<About />
			</LazyView> */}

			<LazyView once={false}>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>

			<LazyView>
				<div className="grid grid-cols-2 gap-5 divide-x">
					<Content duration={1.2}>A</Content>
					<Content>B</Content>
				</div>
			</LazyView>
		</>
	);
}
