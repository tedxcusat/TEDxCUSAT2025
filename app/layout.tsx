import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Initialize Orbitron
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "900"],
});

// Initialize Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Initialize Clash Display
const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Regular.woff2",
  variable: "--font-clash",
  weight: "400",
});

export const metadata: Metadata = {
  title: "TEDxCUSAT 2025",
  description: "TEDx event at CUSAT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
