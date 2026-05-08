export const Footer = () => {
	return (
		<footer className="border-t border-alvaro-border mt-24">
			<div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-sm text-alvaro-muted">
						Alvaro Garcia Macias
					</p>
					<div className="flex gap-6">
						<a
							href="https://github.com/alvaro17f"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-alvaro-muted hover:text-alvaro-white transition-colors duration-200"
						>
							GitHub
						</a>
						<a
							href="https://linkedin.com/in/alvarogarciamacias"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-alvaro-muted hover:text-alvaro-white transition-colors duration-200"
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
