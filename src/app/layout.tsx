import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "Find your next favorite book with BookNook.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className} dark h-full antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-book-page text-book-text">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
