import type { Metadata, Viewport } from "next";
import { Playfair_Display, Figtree } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { resolveLocale } from "@/i18n/request";
import { isRtl } from "@/i18n/config";
import { PwaRegister } from "@/components/pwa-register";

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
  metadataBase: new URL("https://www.couthacts.com"),
  title: "CouthActs™ — Move Anything. Anywhere. Protected.",
  description:
    "The friendliest way to move anything, anywhere. 18 transport modes across 190+ countries. Verified humans, escrow-safe payments, real-time tracking.",
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
  openGraph: {
    type: "website",
    url: "https://www.couthacts.com",
    siteName: "CouthActs",
    title: "CouthActs™ — Move Anything. Anywhere. Protected.",
    description:
      "The friendliest way to move anything, anywhere. Verified humans, escrow-safe payments, real-time tracking across 18 transport modes.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CouthActs™ — Move Anything. Anywhere. Protected.",
    description:
      "The friendliest way to move anything, anywhere. Verified humans, escrow-safe payments, real-time tracking.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();
  const messages = await getMessages();
  const dir = isRtl(locale) ? "rtl" : "ltr";

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CouthActs",
    alternateName: "CouthActs™",
    legalName: "CouthActs, Inc.",
    url: "https://www.couthacts.com",
    logo: "https://www.couthacts.com/images/logo.jpg",
    description:
      "CouthActs, Inc. is a wholly owned subsidiary of The Ravine of Willows, Inc., a Texas corporation. All intellectual property and trademarks are wholly owned by Enemo Consulting Group, Inc.",
    parentOrganization: {
      "@type": "Organization",
      name: "The Ravine of Willows, Inc.",
      legalName: "The Ravine of Willows, Inc.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "The Adolphus Tower, 1412 Main Street, STE 609",
        addressLocality: "Dallas",
        addressRegion: "TX",
        postalCode: "75202",
        addressCountry: "US",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "The Adolphus Tower, 1412 Main Street, STE 609",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75202",
      addressCountry: "US",
    },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: "support@couthacts.com" },
      { "@type": "ContactPoint", contactType: "legal", email: "legal@couthacts.com" },
      { "@type": "ContactPoint", contactType: "press", email: "press@couthacts.com" },
      { "@type": "ContactPoint", contactType: "privacy", email: "privacy@couthacts.com" },
    ],
  };

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${playfair.variable} ${figtree.variable} font-body antialiased`}
      >
        <a href="#main" className="skip-to-main">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <PwaRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
