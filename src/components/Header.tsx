import { useScrollReveal } from "src/hooks/useScrollReveal";

type Props = {
	title: string;
};

export const Header = ({ title }: Props) => {
	const { ref, isVisible } = useScrollReveal();

	return (
		<>
			<div className="h-24" />
			<div ref={ref} className="mb-8 overflow-hidden">
				<h1
					className={`text-3xl md:text-4xl tracking-tight leading-none font-semibold text-alvaro-dark bg-alvaro-primary px-4 py-2 rounded-lg transition-all duration-700 ease-out origin-left ${
						isVisible
							? "opacity-100 scale-x-100"
							: "opacity-0 scale-x-0"
					}`}
				>
					{title}
				</h1>
			</div>
		</>
	);
};
