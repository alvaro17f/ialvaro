"use client";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const links = [
	{
		label: "Home",
		route: "home",
	},
	{
		label: "Biography",
		route: "biography",
	},
	{
		label: "Skills",
		route: "skills",
	},
	{
		label: "Experience",
		route: "experience",
	},
	// {
	// 	label: "Portfolio",
	// 	route: "portfolio",
	// },
	{
		label: "Resume",
		route: "resume",
	},
	{
		label: "Contact",
		route: "contact",
	},
];

export default function Nav() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener("scroll", updatePosition);

		return () => window.removeEventListener("scroll", updatePosition);
	}, []);

	const scroller = (route: string) =>
		document.getElementById(route)?.scrollIntoView({ behavior: "smooth" });

	return (
		<>
			<LazyMotion features={domAnimation}>
				<AnimatePresence>
					{scrollPosition > 700 && (
						<m.nav
							className="fixed z-50 w-full bg-alvaro-base rounded-xl "
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { duration: 0.3 } }}
							transition={{ duration: 1.5 }}
						>
							<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
								<div className="flex items-center justify-between h-16">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<button
												onClick={() => {
													scroller("home");
													isOpen && setIsOpen(!isOpen);
												}}
											>
												<img
													src="/images/ialvaro.svg"
													alt="logo"
													className="h-10"
												/>
											</button>
										</div>
										<div className="hidden md:block">
											<div className="flex items-baseline ml-10 space-x-4">
												{links.map(({ label, route }) => (
													<m.div
														key={route}
														initial={{ scale: 1 }}
														whileHover={{ scale: 1.2 }}
														whileTap={{ scale: 1 }}
													>
														<button
															key={route}
															onClick={() => scroller(route)}
															className="px-3 py-2 text-sm font-medium rounded-md cursor-pointer text-alvaro-white hover:bg-alvaro-danger hover:text-alvaro-dark"
															aria-label={`${label}-desktop`}
														>
															{label}
														</button>
													</m.div>
												))}
											</div>
										</div>
									</div>
									<div className="flex -mr-2 md:hidden">
										<button
											onClick={() => setIsOpen(!isOpen)}
											type="button"
											className="inline-flex items-center justify-center p-2 rounded-md text-alvaro-white focus:outline-none focus:ring-2 focus:ring-offset-2"
											aria-controls="mobile-menu"
											aria-expanded="false"
										>
											<span className="sr-only">menu-mobile</span>
											{!isOpen ? (
												<svg
													className="block w-6 h-6"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M4 6h16M4 12h16M4 18h16"
													/>
												</svg>
											) : (
												<svg
													className="block w-6 h-6"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													aria-hidden="true"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											)}
										</button>
									</div>
								</div>
							</div>

							{isOpen && (
								<div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
									<m.div
										className="md:hidden"
										initial={{ x: 10, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 1 }}
									>
										{links.map(({ label, route }) => (
											<button
												key={route}
												onClick={() => {
													setIsOpen(!isOpen);
													scroller(route);
												}}
												className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-alvaro-muted"
												aria-label={`${label}-mobile`}
											>
												{label}
											</button>
										))}
									</m.div>
								</div>
							)}
						</m.nav>
					)}
				</AnimatePresence>
			</LazyMotion>
		</>
	);
}
