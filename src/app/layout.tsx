import type { Metadata } from 'next'
import { Permanent_Marker, Rubik_Mono_One, Space_Mono } from 'next/font/google'
import { CustomCursor } from '@/components/custom-cursor'
import { NavBar } from '@/components/nav-bar'
import './globals.css'

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const permanentMarker = Permanent_Marker({
  variable: '--font-permanent-marker',
  subsets: ['latin'],
  weight: '400',
})

const rubikMonoOne = Rubik_Mono_One({
  variable: '--font-rubik-mono-one',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Eleazar Villarreal | Portfolio',
  description: 'Portfolio page for Eleazar Villarreal.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${permanentMarker.variable} ${rubikMonoOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark text-foreground font-mono">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CustomCursor />
        <NavBar />
        <div className="flex min-h-full min-w-0 flex-1 flex-col pt-20 sm:pt-24 md:pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
