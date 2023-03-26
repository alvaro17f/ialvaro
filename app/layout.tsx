import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import { Poppins } from "next/font/google";

export const metadata = {
	icons: "/favicon.svg",
	title: {
		default: "AZAMA",
		template: "%s | AZAMA",
	},
	description: "Official website",
};

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["400", "700"],
});

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${poppins.variable} font-sans`}>
				<Navbar />
				<main className="py-6 mx-5 max-w-7xl sm:px-6 lg:px-8">{children}</main>
			</body>
		</html>
	);
}
