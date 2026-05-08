"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const links = [
	{ label: "Home", route: "home" },
	{ label: "About", route: "biography" },
	{ label: "Skills", route: "skills" },
	{ label: "Experience", route: "experience" },
	{ label: "Portfolio", route: "portfolio" },
	{ label: "Contact", route: "contact" },
];

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const scroller = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence>
				<m.nav
					className="fixed top-0 left-0 right-0 z-40 bg-alvaro-base/80 backdrop-blur-xl border-b border-alvaro-border"
					initial={{ y: -80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ type: "spring", stiffness: 100, damping: 20 }}
				>
					<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<button
								type="button"
								onClick={() => {
									scroller("home");
									isOpen && setIsOpen(false);
								}}
								className="text-lg font-semibold tracking-tight text-alvaro-white"
							>
								AM
							</button>

							{/* Desktop nav */}
							<div className="hidden md:flex items-center gap-1">
								{links.map(({ label, route }) => (
									<m.button
										key={route}
										type="button"
										onClick={() => scroller(route)}
										className="px-3 py-2 text-sm font-medium text-alvaro-muted rounded-lg cursor-pointer hover:text-alvaro-white hover:bg-alvaro-surface transition-colors duration-200"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										aria-label={`${label}-desktop`}
									>
										{label}
									</m.button>
								))}
							</div>

							{/* Mobile hamburger */}
							<div className="flex md:hidden">
								<button
									onClick={() => setIsOpen(!isOpen)}
									type="button"
									className="p-2 rounded-lg text-alvaro-white hover:bg-alvaro-surface transition-colors duration-200"
									aria-label="menu-mobile"
									aria-controls="mobile-menu"
									aria-expanded={isOpen}
								>
									{isOpen ? (
										<X size={24} weight="bold" />
									) : (
										<List size={24} weight="bold" />
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					<AnimatePresence>
						{isOpen && (
							<m.div
								ref={ref}
								id="mobile-menu"
								className="md:hidden px-4 pb-4 space-y-1"
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{
									type: "spring",
									stiffness: 200,
									damping: 25,
								}}
							>
								{links.map(({ label, route }, i) => (
									<m.button
										key={route}
										type="button"
										onClick={() => {
											setIsOpen(false);
											scroller(route);
										}}
										className="block w-full px-3 py-2 text-sm font-medium text-alvaro-muted rounded-lg hover:text-alvaro-white hover:bg-alvaro-surface transition-colors duration-200 text-left"
										initial={{ x: -20, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{
											delay: i * 0.05,
											type: "spring",
											stiffness: 200,
											damping: 20,
										}}
										aria-label={`${label}-mobile`}
									>
										{label}
									</m.button>
								))}
							</m.div>
						)}
					</AnimatePresence>
				</m.nav>
			</AnimatePresence>
		</LazyMotion>
	);
};
