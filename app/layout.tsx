import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Nav from "@/components/Nav";

export const metadata = {
  // icons: { icon: "/images/favicon/blue.svg" },
  // title: {
  // 	default: "ialvaro",
  // 	template: "%s - [ iAlvaro ]",
  // },
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
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Nav />
        <main className="py-6 mx-5 md:mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
