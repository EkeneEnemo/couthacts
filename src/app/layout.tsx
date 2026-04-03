import type { Metadata, Viewport } from "next";
import { Playfair_Display, Figtree } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F5F7",
};

export const metadata: Metadata = {
  title: "CouthActs\u2122 \u2014 Global Transportation Infrastructure Platform",
  description:
    "Book any transport mode worldwide \u2014 from taxis to cargo ships, private jets to freight rail. Verified providers, escrow-protected payments, real-time tracking.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CouthActs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${figtree.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
