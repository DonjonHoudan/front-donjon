import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { GA4_ID } from "@/lib/constants";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donjon de Houdan",
  description: "Donjon de Houdan, Yvelines, France",
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
