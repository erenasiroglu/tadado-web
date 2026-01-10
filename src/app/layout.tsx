import type { Metadata } from 'next'
import { Roboto, Geist_Mono } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Tadado - Play AI. Win More.',
  description: 'Modern, personalized cards. Gamified fun. Reimagine how you play and win together.',
  metadataBase: new URL('https://tadado.app'),
  openGraph: {
    title: 'Tadado - Play AI. Win More.',
    description: 'Modern, personalized cards. Gamified fun. Reimagine how you play and win together.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tadado - Play AI. Win More.',
    description: 'Modern, personalized cards. Gamified fun. Reimagine how you play and win together.'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${roboto.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
