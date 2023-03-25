import "@/styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
	title: "AZAMA",
	description: "official website",
};

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Navbar title={metadata.title} />
				<main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
					{children}
				</main>
			</body>
		</html>
	);
}
