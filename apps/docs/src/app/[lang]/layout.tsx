import { i18nProvider } from "fumadocs-ui/i18n";
import { Providers } from "@/components/providers";
import "../global.css";
import "tldraw/tldraw.css";
import { Inter } from "next/font/google";
import { translations, i18n } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers i18n={i18nProvider(translations, lang)}>{children}</Providers>
        <Script
          strategy="afterInteractive"
          src="https://umami.sebasgc.xyz/script.js"
          data-website-id="09344c66-b8fb-45c4-8049-a5e86134a511"
          data-performance="true"
        />
        <Script
          strategy="afterInteractive"
          src="https://umami.sebasgc.xyz/recorder.js"
          data-website-id="09344c66-b8fb-45c4-8049-a5e86134a511"
        />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
