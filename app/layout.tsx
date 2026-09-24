import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { Toaster} from '@/components/ui/sonner'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],  // Optional: specify weights
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FeedLoop - Streamline Your Feedback Collection",
  description: "FeedLoop is a powerful SaaS platform for creating surveys, collecting feedback, and analyzing responses to improve your products and services.",
  keywords: ["surveys", "feedback", "analytics", "SaaS", "customer insights", "data collection"],
  authors: [{ name: "FeedLoop Team" }],
  openGraph: {
    title: "FeedLoop - Streamline Your Feedback Collection",
    description: "FeedLoop is a powerful SaaS platform for creating surveys, collecting feedback, and analyzing responses to improve your products and services.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FeedLoop - Streamline Your Feedback Collection",
    description: "FeedLoop is a powerful SaaS platform for creating surveys, collecting feedback, and analyzing responses to improve your products and services.",
    images: ["/banner.png"],
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
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "FeedLoop",
              "description": "FeedLoop is a powerful SaaS platform for creating surveys, collecting feedback, and analyzing responses to improve your products and services.",
              "url": "https://feed-loop-two.vercel.app/",
              "image": "https://feed-loop-two.vercel.app/",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "$19.99", // Or your pricing
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Dachenna"
              }
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
