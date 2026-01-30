import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "TEDxCUSAT 6th Edition | Genesis | Ideas Worth Spreading",
  description: "Join TEDxCUSAT 6th Edition at Athulya Hall, Infopark Kochi on Jan 31, 2026. Explore the theme 'Genesis: From Concept to Impact' with speakers like Sujith Vaassudev and Kaif Muhammad. Organized by Deva Nandan S and Adithyan Pramod.",
  keywords: ["TEDx", "CUSAT", "conference", "innovation", "ideas", "talks", "speakers", "TEDxCUSAT 6th Edition", "Genesis", "From Concept to Impact", "Kochi", "Kerala", "Infopark", "Athulya Hall", "Sujith Vaassudev", "Kaif Muhammad", "Aparna Premraj", "Ahmad Al Kaashekh", "Dr. Fahed VP", "Sreeraj Gopi", "Deva Nandan S", "Adithyan Pramod", "Infopark", "Makemypass", "CakePots", "Technology", "Entertainment", "Design"],
  authors: [{ name: "TEDxCUSAT" }, { name: "Deva Nandan S" }, { name: "Adithyan Pramod" }],
  creator: "TEDxCUSAT",
  publisher: "TEDxCUSAT",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  openGraph: {
    type: "website",
    url: "https://tedxcusat.in",
    title: "TEDxCUSAT 6th Edition | Genesis",
    description: "Join TEDxCUSAT 6th Edition at Athulya Hall, Infopark Kochi on Jan 31, 2026. Explore the theme 'Genesis: From Concept to Impact'.",
    images: [
      {
        url: "/images/logo-white.png",
        width: 1200,
        height: 630,
        alt: "TEDxCUSAT 6th Edition - Genesis",
      },
    ],
    locale: "en_US",
    siteName: "TEDxCUSAT",
  },
  twitter: {
    card: "summary_large_image",
    title: "TEDxCUSAT 6th Edition | Genesis",
    description: "Join TEDxCUSAT 6th Edition at Athulya Hall, Infopark Kochi on Jan 31, 2026.",
    images: ["/images/og-image.jpg"],
    creator: "@TEDxCUSAT",
  },
  alternates: {
    canonical: "https://tedxcusat.in",
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
    name: "TEDxCUSAT 6th Edition - Genesis",
    description:
      "TEDxCUSAT 6th Edition - Genesis: From Concept to Impact. An exclusive gathering of innovative minds at Athulya Hall, Infopark Kochi.",
    startDate: "2026-01-31T09:00",
    endDate: "2026-01-31T18:00",
    eventAttendanceMode: "OfflineEventAttendanceMode",
    eventStatus: "EventScheduled",
    location: {
      "@type": "Place",
      name: "Athulya Hall",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Athulya Rd, Infopark Campus, Infopark",
        addressLocality: "Kochi, Kakkanad",
        addressRegion: "Kerala",
        postalCode: "682042",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "TEDxCUSAT",
      url: "https://tedxcusat.in",
    },
    image: ["/images/logo-white.png"],
    performers: [
      { "@type": "Person", name: "Sujith Vaassudev" },
      { "@type": "Person", name: "Kaif Muhammad" },
      { "@type": "Person", name: "Aparna Premraj" },
      { "@type": "Person", name: "Ahmad Al Kaashekh" },
      { "@type": "Person", name: "Dr. Fahed VP" },
      { "@type": "Person", name: "Sreeraj Gopi" }
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning={true} className="snap-y snap-proximity">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://tedxcusat.in" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${orbitron.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}