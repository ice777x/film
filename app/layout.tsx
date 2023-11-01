import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fx - Watch Movies Online Free",
  description: "Watch Movies Online Free",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${font.className} scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-800 scrollbar-thumb-rounded-lg`}
      >
        <main className="max-w-5xl mx-auto px-4 lg:px-0">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
