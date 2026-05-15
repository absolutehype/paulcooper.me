import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@/app/globals.css";
import { ReactNode } from "react";
import { PageLoader } from "@/components/PageLoader";
import { routing } from "@/i18n/routing";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500"],
  display: "swap",
});

const SITE_URL = "https://paulcooper.me";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDefault = locale === routing.defaultLocale;
  const canonical = isDefault ? SITE_URL : `${SITE_URL}/${locale}`;

  const languages: Record<string, string> = { "x-default": SITE_URL };
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`;
  }

  const title = "Paul Cooper — Design Engineer in London";
  const description =
    "Paul Cooper is a London-based Design Engineer at Human Made Machine. Over a decade of experience designing and building front-end products for industry-leading brands.";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: "Paul Cooper",
    authors: [{ name: "Paul Cooper", url: SITE_URL }],
    creator: "Paul Cooper",
    publisher: "Paul Cooper",
    keywords: [
      "Paul Cooper",
      "Paul Cooper London",
      "Paul Cooper Design Engineer",
      "Paul Cooper Human Made Machine",
      "absolutehype",
      "Design Engineer",
      "Front End Developer",
      "London",
    ],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "profile",
      url: canonical,
      siteName: "Paul Cooper",
      title,
      description,
      locale,
      firstName: "Paul",
      lastName: "Cooper",
      username: "absolutehype",
      images: [
        {
          url: "/images/header.jpeg",
          width: 1200,
          height: 630,
          alt: "Paul Cooper — Design Engineer in London",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/header.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paul Cooper",
    alternateName: "absolutehype",
    url: SITE_URL,
    image: `${SITE_URL}/images/avatar.jpeg`,
    jobTitle: "Design Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Human Made Machine",
      url: "https://www.humanmademachine.com/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    sameAs: [
      "https://www.linkedin.com/in/absolutehype/",
      "https://www.instagram.com/absolutehype/",
      "https://github.com/absolutehype",
    ],
  };

  return (
    <html lang={locale}>
      <body className={cormorant.className}>
        <PageLoader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
