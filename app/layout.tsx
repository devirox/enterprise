import './globals.css'
import React from 'react'
import FooterComplex from '../src/components/smoothui/footer-2'
import { HeroHeader } from '../src/components/smoothui/shared/hero-header'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'DeviroxN Enterprise',
  description: 'Enterprise app scaffold for Finance, Marketplace, and Real Estate'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <HeroHeader /> */}
            {children}

            {/* <FooterComplex /> */}

          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
