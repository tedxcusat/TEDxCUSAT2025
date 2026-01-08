import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import localFont from "next/font/local";

const clashDisplay = localFont({
  src: "../fonts/Clash Display Variable.woff2",
  variable: "--font-clash",
  display: "swap",
});


const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "TEDx CUSAT 2026",
  description: "TEDxCUSAT 2026 Official Website",
// Initialize Orbitron
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "900"],
});

// // Initialize Inter
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${orbitron.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
