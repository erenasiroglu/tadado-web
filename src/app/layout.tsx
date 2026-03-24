import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: 'Tadado: AI Party Guessing Game',
    template: '%s | Tadado'
  },
  description:
    'AI word guessing party game for iPhone. Describe without forbidden words, play themed decks with friends. Free on the App Store.',
  metadataBase: new URL('https://tadado.app'),
  openGraph: {
    title: 'Tadado: AI Party Guessing Game',
    description:
      'AI word guessing party game for iPhone. Describe without forbidden words, play themed decks with friends.',
    type: 'website',
    siteName: 'Tadado'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tadado: AI Party Guessing Game',
    description:
      'AI word guessing party game for iPhone. Describe without forbidden words, play themed decks with friends.'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MTNC3MFF');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MTNC3MFF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LYSWJHHH9L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LYSWJHHH9L');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
