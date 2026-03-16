import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Petit Stay",
    default: "서울에서 믿을 수 있는 베이비시터 | Petit Stay",
  },
  description:
    "서울 여행 중인 가족을 위한 검증된 다국어 베이비시터. 간편하게 예약하고, 편안한 저녁을 보내세요.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Petit Stay",
    images: ["/og-image.svg"],
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
