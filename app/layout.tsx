import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Российская педиатрическая AI-платформа «Детский врач»',
  description:
    'Российская педиатрическая AI-платформа «Детский врач»: портфель стратегических инициатив для детского здравоохранения, включая ИИ, регистры, аналитику, единую ЭМК и федеральные интеграции.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
