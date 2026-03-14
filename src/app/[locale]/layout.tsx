import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/app/globals.css";
import { ReactNode } from "react";
import { PageLoader } from "@/components/PageLoader";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Receive messages provided in `i18n.ts`
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={cormorant.className}>
        <PageLoader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
