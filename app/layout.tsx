import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA4_ID } from "@/lib/constants";
import { ToastContainer } from "react-toastify";
import CookieConsent from "./cookie-consent";
import { getConfiguration } from "@/lib/api/resources/configuration";
import "./globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

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
        <CookieConsent />
        <ToastContainer />
        {GA4_ID && <GoogleAnalytics gaId={GA4_ID} />}
      </body>
    </html>
  );
}
