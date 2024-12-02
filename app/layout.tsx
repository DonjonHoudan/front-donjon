import type { Metadata } from "next";
import Script from "next/script";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA4_ID } from "@/lib/constants";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Le Donjon de Houdan",
  description: "Le Donjon de Houdan est une ancienne tour maitresse, du début du 12ème siècle bâtie par Amaury III de Montfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo-donjon.png"
        />
        <Script
          src="https://cmp.osano.com/AzqUQbUVpjrf26nAD/10caff8a-3fae-47be-9b65-bdb3a500e208/osano.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={nunito.className}>
        {children}
        <Analytics />
        <SpeedInsights />
        {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}
      </body>
    </html>
  );
}
