import { seoData } from "@/config/seo";
import { getUrl } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "./globals.css"
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Next.js Blog",
    default: seoData.title,
    absolute: seoData.absoluteTitle,
  },
  applicationName: seoData.title,
  description: seoData.description,
  referrer: "origin-when-cross-origin",
  keywords: seoData.keywords,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl()),
  alternates: {
    canonical: "/",
  },
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  //   userScalable: false,
  //   viewportFit: "cover",
  // },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getUrl(),
    title: seoData.title,
    description: seoData.description,
    siteName: seoData.title,
    images: [
      {
        // url: getOgImageUrl(metaData.title, metaData.subTitle, metaData.tags, '/'),
        url: `${getUrl()}/images/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: seoData.title,
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={fontSans.variable}>
        <div className="bg-white font-sans">
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}