import { m, LazyMotion, domAnimation } from "framer-motion";
import { Wobble } from "src/components/Wobble";

export const Home = () => {
	return (
		<section
			id="home"
			className="min-h-[100dvh] grid md:grid-cols-[1.2fr_1fr] items-center gap-8 px-4 md:px-0"
		>
			<div className="space-y-2">
				<Wobble sentence="ALVARO" />
				<Wobble sentence="GARCIA" />
				<Wobble sentence="MACIAS" />
			</div>
			<LazyMotion features={domAnimation}>
				<m.div
					className="hidden md:block"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						type: "spring",
						stiffness: 60,
						damping: 20,
						delay: 0.5,
					}}
				>
					<p className="text-alvaro-muted text-lg leading-relaxed max-w-[40ch]">
						Full Stack Developer. Building interfaces that move.
					</p>
				</m.div>
			</LazyMotion>
		</section>
	);
};
