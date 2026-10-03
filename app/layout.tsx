import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://feed-loop-two.vercel.app'
const description =
  'FeedLoop is the survey, the inbox, and the AI brief. Build NPS or custom questions, share a public link, then turn answers into themes and next steps.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FeedLoop — Stop collecting feedback you never read",
  description,
  keywords: ["surveys", "feedback", "NPS", "CSAT", "analytics", "SaaS", "Paystack"],
  authors: [{ name: "David", url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    title: "FeedLoop — Stop collecting feedback you never read",
    description,
    url: siteUrl,
    siteName: 'FeedLoop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FeedLoop — Stop collecting feedback you never read",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'FeedLoop',
              description,
              url: siteUrl,
              image: `${siteUrl}/opengraph-image`,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              creator: {
                '@type': 'Person',
                name: 'David',
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning={true} className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
