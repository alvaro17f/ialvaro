"use client";
import { Transition } from "@headlessui/react";
import "animate.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
	{
		label: "Home",
		route: "/",
	},
	{
		label: "About",
		route: "/about",
	},
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	return (
		<>
			<nav>
				<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Link href="/">
									<img className="w-32" src="azama_full.svg" alt="logo" />
								</Link>
							</div>
							<div className="hidden md:block">
								<div className="flex items-baseline ml-10 space-x-4">
									{links.map(({ label, route }) => (
										<Link
											key={route}
											href={route}
											className="px-3 py-2 text-sm font-medium rounded-md text-azama-text-white hover:bg-azama-primary hover:text-azama-text-dark"
											aria-label={`${label}-desktop`}
										>
											{label}
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className="flex -mr-2 md:hidden">
							<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-azama-text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
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

				<Transition
					show={isOpen}
					enter="transition ease-out duration-100 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-75 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{
						<div className="md:hidden">
							<div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								{links.map(({ label, route }) => (
									<Link
										key={route}
										href={route}
										onClick={() => setIsOpen(!isOpen)}
										className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-gray-700"
										aria-label={`${label}-mobile`}
									>
										{label}
									</Link>
								))}
							</div>
						</div>
					}
				</Transition>
			</nav>
		</>
	);
}
