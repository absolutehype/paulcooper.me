import type { Metadata } from "next";
import Head from "next/head";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paul Cooper - Front End Developer",
  description:
    "The personal website of Paul Cooper, a London based Front End Developer working at Human Made Machine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={cormorant.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
