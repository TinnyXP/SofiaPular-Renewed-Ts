import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Noto_Sans_Thai } from 'next/font/google'
import { Provider } from '@/app/provider';

import { SignatureIcon } from '@/../public/Icon';
import NavBarAdmin from '@/components/NavBarAdmin';

const inter = Noto_Sans_Thai({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SofiaPular',
  description: 'Generated by create next app',
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
          <NavBarAdmin />
          {children}
          <AdminFooter />
        </Provider>
      </body>
    </html>
  )
}

const AdminFooter = () => {
  return (
    <div className='container mx-auto max-w-7xl px-12 py-10'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <a className='relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-60 active:opacity-disabled transition-opacity flex justify-end items-center gap-2 text-foreground hover:cursor-pointer'
          href='https://www.sofiapular.com/'
        >
          <span className='text-xs font-medium flex items-center leading-none mt-1'>&copy;2023 Copyright</span>
          <SignatureIcon className='w-[65px] h-[20px] fill-black dark:fill-white' />
        </a>
      </div>
    </div>
  );
};