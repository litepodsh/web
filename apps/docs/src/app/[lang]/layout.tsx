import { i18nProvider } from "fumadocs-ui/i18n";
import { Providers } from "@/components/providers";
import "../global.css";
import "tldraw/tldraw.css";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { translations, i18n } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";
import type { Metadata } from "next";
import Script from "next/script";

const commitMono = localFont({
  src: "../../fonts/CommitMono-Regular.woff2",
  variable: "--font-commit-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Litepod Docs", template: "%s · Litepod Docs" },
  description: "Install Litepod, deploy applications and databases, and operate your own server.",
  openGraph: {
    siteName: "Litepod Docs",
    type: "website",
    images: [{ url: "/en/og/docs/image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${GeistSans.variable} ${commitMono.variable} font-sans`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers i18n={i18nProvider(translations, lang)}>{children}</Providers>
        <Script
          strategy="afterInteractive"
          src="https://umami.sebasgc.xyz/script.js"
          data-website-id="c5456e0f-5e45-4534-981b-49ea287ac39f"
          data-performance="true"
        />
        <Script
          strategy="afterInteractive"
          src="https://umami.sebasgc.xyz/recorder.js"
          data-website-id="c5456e0f-5e45-4534-981b-49ea287ac39f"
        />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
