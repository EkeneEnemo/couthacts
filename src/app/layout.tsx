import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "CouthActs™ — Global Transportation Infrastructure Platform",
  description:
    "Book any transport mode worldwide — from taxis to cargo ships, private jets to freight rail. Verified providers, escrow-protected payments, real-time tracking.",
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
