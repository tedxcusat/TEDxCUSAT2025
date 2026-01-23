import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// Initialize Orbitron
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "900"],
});


// Initialize Clash Display
const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
});

export const metadata: Metadata = {
  title: "TEDxCUSAT 2025 | Ideas Worth Spreading",
  description: "Join TEDxCUSAT 2025, an exclusive gathering of innovative minds. Discover inspiring talks and ideas worth spreading at CUSAT. Register now!",
  keywords: ["TEDx", "CUSAT", "conference", "innovation", "ideas", "talks", "speakers"],
  authors: [{ name: "TEDxCUSAT" }],
  creator: "TEDxCUSAT",
  publisher: "TEDxCUSAT",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    type: "website",
    url: "https://tedxcusat.com",
    title: "TEDxCUSAT 2025 | Ideas Worth Spreading",
    description: "Join TEDxCUSAT 2025, an exclusive gathering of innovative minds. Discover inspiring talks and ideas worth spreading at CUSAT.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TEDxCUSAT 2025",
      },
    ],
    locale: "en_US",
    siteName: "TEDxCUSAT 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxCUSAT 2025 | Ideas Worth Spreading",
    description: "Join TEDxCUSAT 2025, an exclusive gathering of innovative minds.",
    images: ["/images/og-image.jpg"],
    creator: "@TEDxCUSAT",
  },
  alternates: {
    canonical: "https://tedxcusat.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "TEDxCUSAT 2025",
    description:
      "TEDxCUSAT 2025 - Ideas Worth Spreading. An exclusive gathering of innovative minds at CUSAT.",
    startDate: "2025-04-12",
    endDate: "2025-04-12",
    eventAttendanceMode: "OfflineEventAttendanceMode",
    eventStatus: "EventScheduled",
    location: {
      "@type": "Place",
      name: "Cochin University of Science and Technology (CUSAT)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kochi",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "TEDxCUSAT",
      url: "https://tedxcusat.com",
    },
    image: ["/images/og-image.jpg"],
  };

  return (
    <html lang="en" suppressHydrationWarning={true} className="snap-y snap-proximity">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://tedxcusat.com" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${orbitron.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}