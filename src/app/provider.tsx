'use client'

import { SessionProvider } from "next-auth/react"
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <NextThemeProvider
          attribute='class'
          defaultTheme='light'
          themes={['light', 'dark']}
        >
          {children}
        </NextThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}