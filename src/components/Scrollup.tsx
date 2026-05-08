import {
	m,
	AnimatePresence,
	LazyMotion,
	domAnimation,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";

export const goToTop = () => {
	document.documentElement.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export const Scrollup = () => {
	const [visible, setVisible] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setVisible(latest > 400);
	});

	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence>
				{visible && (
					<m.button
						onClick={goToTop}
						aria-label="Scroll to top"
						className="flex justify-center items-center fixed bottom-12 right-12 w-12 h-12 bg-alvaro-primary text-alvaro-dark rounded-full cursor-pointer hover:opacity-90 transition-opacity duration-200"
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 40, opacity: 0 }}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 20,
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						<ArrowUp size={24} weight="bold" />
					</m.button>
				)}
			</AnimatePresence>
		</LazyMotion>
	);
};
