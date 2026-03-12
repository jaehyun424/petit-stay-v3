import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Petit Stay",
    default: "Petit Stay — Trusted Babysitters in Seoul",
  },
  description:
    "Find verified, multilingual babysitters for your family in Seoul. Book in minutes, enjoy your evening.",
  openGraph: {
    type: "website",
    siteName: "Petit Stay",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
