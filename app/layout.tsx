import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    ...(siteConfig.canonicalUrl ? { url: siteConfig.canonicalUrl } : {}),
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <InteractiveAtmosphere />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <div className="site-frame">
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </div>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </body>
    </html>
  );
}
