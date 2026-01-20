import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Réflexologie Chartres - Mélinda Favris | Réflexologue certifiée RNCP',
  description: 'Mélinda Favris, réflexologue certifiée RNCP à Chartres. Réflexologie plantaire et faciale pour adultes, enfants et bébés. Retrouvez bien-être et sérénité. 4.9/5 sur Google (71 avis).',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
