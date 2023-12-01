import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Noto_Sans_Thai } from 'next/font/google'
import { Provider } from '@/app/provider';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Noto_Sans_Thai({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SofiaPular',
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
          <NavBar />
            <ScrollToTop />
            {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}