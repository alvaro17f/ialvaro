export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-alvaro-border mt-32 md:mt-48">
			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-3 gap-12">
					{/* Brand */}
					<div>
						<h3 className="text-xl font-bold tracking-tight mb-3">
							Alvaro Garcia Macias
						</h3>
						<p className="text-sm text-alvaro-muted leading-relaxed max-w-[30ch]">
							Full Stack Developer building interfaces that move.
						</p>
					</div>

					{/* Navigation */}
					<div>
						<h4 className="text-sm font-semibold text-alvaro-white mb-4">
							Navigation
						</h4>
						<ul className="space-y-2">
							{[
								"Home",
								"About",
								"Skills",
								"Experience",
								"Portfolio",
								"Contact",
							].map((label) => (
								<li key={label}>
									<a
										href={`#${label.toLowerCase() === "about" ? "biography" : label.toLowerCase()}`}
										className="text-sm text-alvaro-muted hover:text-alvaro-white transition-colors duration-200"
									>
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Social */}
					<div>
						<h4 className="text-sm font-semibold text-alvaro-white mb-4">
							Connect
						</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="https://github.com/alvaro17f"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-alvaro-muted hover:text-alvaro-white transition-colors duration-200"
								>
									GitHub
								</a>
							</li>
							<li>
								<a
									href="https://linkedin.com/in/alvarogarciamacias"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-alvaro-muted hover:text-alvaro-white transition-colors duration-200"
								>
									LinkedIn
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-alvaro-border flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-xs text-alvaro-muted">
						&copy; {year} Alvaro Garcia Macias. All rights
						reserved.
					</p>
					<button
						type="button"
						onClick={() =>
							document.documentElement.scrollTo({
								top: 0,
								behavior: "smooth",
							})
						}
						className="text-xs text-alvaro-muted hover:text-alvaro-white transition-colors duration-200"
					>
						Back to top &uarr;
					</button>
				</div>
			</div>
		</footer>
	);
};
