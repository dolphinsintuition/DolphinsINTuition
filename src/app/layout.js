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

// ─── Umami Analytics (Privacy-Friendly) ────────────────────────────────────────
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''
const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://analytics.umami.is/script.js'

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dolphins Intuition',
  url: 'https://dolphinsintuition.com',
  logo: 'https://dolphinsintuition.com/logo.png',
  description:
    'AI-powered cetacean communication research using DolphinGemma and open science practices.',
  foundingDate: '2025',
  founder: {
    '@type': 'Person',
    name: 'Chris Ransford',
  },
  sameAs: [
    'https://twitter.com/DolphinsIntuition',
    'https://linkedin.com/company/dolphins-intuition',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    url: 'https://dolphinsintuition.com/contact',
    contactType: 'Customer Service',
  },
}

const jsonLdResearchProject = {
  '@context': 'https://schema.org',
  '@type': 'ResearchProject',
  name: 'Dolphins Intuition',
  description:
    'Open-source research into cetacean communication using AI models, bioacoustics analysis, and peer-reviewed science.',
  url: 'https://dolphinsintuition.com/research',
  sponsor: {
    '@type': 'Organization',
    name: 'Dolphins Intuition',
  },
  keywords: ['dolphin communication', 'AI', 'cetacean research', 'DolphinGemma', 'bioacoustics'],
  isAccessibleForFree: true,
  license: 'https://creativecommons.org/licenses/by-sa/4.0/',
}

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://dolphinsintuition.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Research',
      item: 'https://dolphinsintuition.com/research',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'About',
      item: 'https://dolphinsintuition.com/about',
    },
  ],
}

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

        {/* ── Umami Analytics (Privacy-Friendly, No Cookies) ── */}
        {UMAMI_WEBSITE_ID && (
          <Script
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
            async
            defer
          />
        )}

        {/* ── JSON-LD Structured Data ── */}
        <Script id="json-ld-org" type="application/ld+json">
          {JSON.stringify(jsonLdOrganization)}
        </Script>
        <Script id="json-ld-research" type="application/ld+json">
          {JSON.stringify(jsonLdResearchProject)}
        </Script>
        <Script id="json-ld-breadcrumb" type="application/ld+json">
          {JSON.stringify(jsonLdBreadcrumb)}
        </Script>

        {/* ── Preconnect for performance ── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {UMAMI_WEBSITE_ID && (
          <link rel="preconnect" href="https://analytics.umami.is" />
        )}

        {/* ── Sitemap & RSS ── */}
        <link rel="sitemap" href="https://dolphinsintuition.com/sitemap.xml" />
      </head>
      <body className="bg-ocean-black min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
