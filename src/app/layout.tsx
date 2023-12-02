import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Noto_Sans_Thai } from 'next/font/google'

const inter = Noto_Sans_Thai({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SofiaPular',
  description: 'เว็บไซต์การ์ตูนออนไลน์ "อยู่กับเธอแล้วสบายใจ"',
  manifest: '/manifest.json',
  icons: { apple: '/icons/icon-192x192.png' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='th' className='light'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
