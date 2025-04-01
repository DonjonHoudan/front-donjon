import type { Metadata, ResolvingMetadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA4_ID } from "@/lib/constants";
import { ToastContainer } from "react-toastify";
import CookieConsent from "./cookie-consent";
import { getConfiguration } from "@/lib/api/resources/configuration";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const configuration = await getConfiguration();
  return {
    title: configuration?.nom_site,
    description: configuration?.description_site,
  };
}

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
        <CookieConsent />
        <ToastContainer />
        {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}
      </body>
    </html>
  );
}
