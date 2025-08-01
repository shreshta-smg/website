import type { Metadata } from "next";
import { Fredoka, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "700"], // '700' for bold
  variable: "--font-fredoka", // Define a CSS variable for Fredoka
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"], // Just '400' for regular text
  variable: "--font-poppins", // Define a CSS variable for Poppins
});

export const metadata: Metadata = {
  title: "SKYM ",
  description: "Our Journey towards Inner Peace and Wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lemonade">
      <body
        className={`${fredoka.variable} ${poppins.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
