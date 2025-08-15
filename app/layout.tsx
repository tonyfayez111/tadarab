import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { Providers } from "./providers";
import Footer from "./components/layout/Footer";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${almarai.className} ${almarai.variable}`}>
      <Navbar/>
        <Providers>
          {children}
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
