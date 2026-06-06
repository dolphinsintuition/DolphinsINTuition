import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Dolphins Intuition — Listening at the edge of language',
  description: 'AI-powered dolphin communication research. Explore DolphinGemma, upload recordings, and contribute to understanding cetacean language.',
  openGraph: {
    title: 'Dolphins Intuition',
    description: 'Listening at the edge of language.',
    url: 'https://dolphins.krispyking.com',
    siteName: 'Dolphins Intuition',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-ocean-black min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
