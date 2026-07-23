import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteFrame } from "@/components/layout/site-frame";
import { MotionProvider } from "@/components/motion/motion-provider";
import { InteractiveAtmosphere } from "@/components/effects/interactive-atmosphere";
import { siteConfig } from "@/content/site";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: {
    default: "rappidAI Research — Compact and Local AI Models",
    template: "%s",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  metadataBase: siteConfig.canonicalUrl
    ? new URL(siteConfig.canonicalUrl)
    : undefined,
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteConfig.canonicalUrl
          ? `${siteConfig.canonicalUrl}/#website`
          : "#website",
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: ["en", "de"],
        ...(siteConfig.canonicalUrl ? { url: siteConfig.canonicalUrl } : {}),
      },
      {
        "@type": "Person",
        "@id": siteConfig.canonicalUrl
          ? `${siteConfig.canonicalUrl}/#founder`
          : "#founder",
        name: siteConfig.founder.name,
        jobTitle: siteConfig.founder.role,
      },
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <InteractiveAtmosphere />
        <MotionProvider>
          <SiteFrame>{children}</SiteFrame>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </body>
    </html>
  );
}
