import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Script from 'next/script'

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL('https://dolphinsintuition.com'),
  title: {
    default: 'Dolphins Intuition — AI-Powered Dolphin Communication Research',
    template: '%s | Dolphins Intuition',
  },
  description:
    'Using AI and DolphinGemma to decode dolphin vocalizations. Explore cetacean communication research, upload recordings, and join the open science community.',
  keywords: [
    'dolphin communication',
    'dolphin AI',
    'cetacean research',
    'DolphinGemma',
    'interspecies communication',
    'dolphin vocalizations',
    'bioacoustics',
    'marine biology AI',
  ],
  authors: [{ name: 'Dolphins Intuition', url: 'https://dolphinsintuition.com' }],
  creator: 'Dolphins Intuition',
  publisher: 'Dolphins Intuition',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Dolphins Intuition — Listening at the Edge of Language',
    description:
      'AI-powered cetacean communication research. Decode dolphin vocalizations with DolphinGemma.',
    url: 'https://dolphinsintuition.com',
    siteName: 'Dolphins Intuition',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dolphins Intuition — AI Dolphin Communication Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dolphins Intuition — Listening at the Edge of Language',
    description: 'AI-powered cetacean communication research.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://dolphinsintuition.com',
  },
}

// ─── GA4 Measurement ID ────────────────────────────────────────────────────────
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-MNB4PKHG79'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ── Google Analytics 4 ── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  cookie_flags: 'SameSite=None;Secure',
                });
              `}
            </Script>
          </>
        )}

        {/* ── Kit (ConvertKit) — async, non-blocking ── */}
        <Script
          src="https://f.convertkit.com/ckjs/ck.5.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="bg-ocean-black min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
