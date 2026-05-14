import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { poppinsBlackItalic } from '@/lib/fonts'
import './globals.css'
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap'
})

const OG_IMAGE = {
  url: '/tadado_launch.png',
  width: 1200,
  height: 630,
  alt: 'Tadado — AI Word Guessing Party Game'
} as const

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  title: {
    default: 'Tadado: AI Party Guessing Game',
    template: '%s | Tadado'
  },
  description:
    'AI taboo-style party game with unlimited cards and themed decks. Describe without forbidden words, guess fast with friends.',
  metadataBase: new URL('https://tadado.app'),
  openGraph: {
    title: 'Tadado: AI Party Guessing Game',
    description:
      'AI taboo-style party game with unlimited cards and themed decks. Describe without forbidden words, guess fast with friends.',
    type: 'website',
    siteName: 'Tadado',
    images: [OG_IMAGE]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tadado: AI Party Guessing Game',
    description:
      'AI taboo-style party game with unlimited cards and themed decks. Describe without forbidden words, guess fast with friends.',
    images: [OG_IMAGE]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", notoSans.variable, playfairDisplayHeading.variable)}>
      <body
        className={`${plusJakartaSans.variable} ${poppinsBlackItalic.variable} min-h-dvh bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
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
