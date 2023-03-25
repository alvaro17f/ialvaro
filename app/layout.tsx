import "@/styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
	icons: "/favicon.ico",
	title: {
		default: "AZAMA",
		template: "%s | AZAMA",
	},
	description: "Official website",
};

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				<main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
					{children}
				</main>
			</body>
		</html>
	);
}
