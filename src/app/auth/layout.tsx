import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Noto_Sans_Thai } from 'next/font/google'
import { Provider } from '@/app/provider';

const inter = Noto_Sans_Thai({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SofiaPular - Admin',
  description: 'เว็บไซต์การ์ตูนออนไลน์ "อยู่กับเธอแล้วสบายใจ"',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='th' className='light'>
      <body className={inter.className}>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  )
}