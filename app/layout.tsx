// src/app/layout.tsx
import './globals.css';
import { Poppins } from 'next/font/google';

// 1. Configure the font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'], // Light, Regular, SemiBold, Bold
  variable: '--font-poppins', // We create a CSS variable to use in globals.css
});

export const metadata = {
  title: 'TEDxCUSAT',
  description: 'Where the brightest minds come together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 2. Add the variable to the body class list */}
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}