import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
<body className={`${orbitron.variable} ${clashDisplay.variable} bg-black`}>        
        {children}
      </body>
    </html>
  );
}
