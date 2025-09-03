import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script, Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import ReduxProvider from "@/providers/ReduxProvider"; // <-- import do provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BC Doceria",
  description: "Sua vida mais doce ✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${playfairDisplay.variable} 
          ${dancingScript.variable}
          ${greatVibes.variable} 
          antialiased
        `}
      >
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
