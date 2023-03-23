import "../styles/globals.css";
import Nav from "./components/Nav";

export const metadata = {
	title: "AZAMA",
	description: "official website",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Nav />
				{children}
			</body>
		</html>
	);
}
