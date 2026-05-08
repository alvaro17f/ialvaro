import { useState, useEffect, useRef } from "react";
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
	const [isScrolled, setIsScrolled] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	const scroller = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	return (
		<nav
			ref={navRef}
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
				isScrolled
					? "bg-alvaro-base/90 backdrop-blur-xl border-b border-alvaro-border shadow-lg shadow-black/5"
					: "bg-transparent"
			}`}
		>
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<button
						type="button"
						onClick={() => {
							scroller("home");
							isOpen && setIsOpen(false);
						}}
						className="text-lg font-semibold tracking-tight text-alvaro-white hover:text-alvaro-primary transition-colors duration-200"
					>
						AM
					</button>

					{/* Desktop */}
					<div className="hidden md:flex items-center gap-1">
						{links.map(({ label, route }) => (
							<button
								key={route}
								type="button"
								onClick={() => scroller(route)}
								className="px-3 py-2 text-sm font-medium text-alvaro-muted rounded-lg cursor-pointer hover:text-alvaro-white hover:bg-alvaro-surface/50 transition-all duration-200 active:scale-[0.97]"
								aria-label={`${label}-desktop`}
							>
								{label}
							</button>
						))}
					</div>

					{/* Mobile */}
					<div className="flex md:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							type="button"
							className="p-2 rounded-lg text-alvaro-white hover:bg-alvaro-surface/50 transition-colors duration-200"
							aria-label="menu-mobile"
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
			{isOpen && (
				<div className="md:hidden border-t border-alvaro-border/30">
					<div className="px-4 py-3 space-y-1">
						{links.map(({ label, route }, i) => (
							<button
								key={route}
								type="button"
								onClick={() => {
									setIsOpen(false);
									scroller(route);
								}}
								className="block w-full px-3 py-2 text-sm font-medium text-alvaro-muted rounded-lg hover:text-alvaro-white hover:bg-alvaro-surface/50 transition-all duration-200 text-left active:scale-[0.98]"
								style={{ transitionDelay: `${i * 40}ms` }}
								aria-label={`${label}-mobile`}
							>
								{label}
							</button>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};
