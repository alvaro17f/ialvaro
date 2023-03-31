import Content from "@/components/Content";

export default function Resume() {
	return (
		<>
			<section id="resume">
			<div className="h-20"/>
				<a href="/assets/resume.pdf" target="_blank" rel="noreferrer">
					<Content style="border-[5px] border-azama-danger text-azama-white">
						<div className="grid place-items-center">
							<h1 className="text-5xl">GET MY RESUME FOR FREE!</h1>
							<img src="/skills/react.svg" alt="download" className="h-20" />
						</div>
					</Content>
				</a>
			</section>
		</>
	);
}
