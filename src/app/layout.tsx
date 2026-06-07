import type { Metadata } from 'next'
import { Permanent_Marker, Rubik_Mono_One, Space_Mono } from 'next/font/google'
import { CustomCursor } from '@/components/custom-cursor'
import { NavBar } from '@/components/nav-bar'
import './globals.css'
import { Footer } from '@/components/footer'

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
      <body
        id="top"
        className="min-h-full flex flex-col bg-dark text-foreground font-mono"
      >
        <a
          href="#main-content"
          className="absolute left-4 -top-12 z-10000 bg-cyan px-4 py-[0.6rem] font-mono text-xs tracking-widest text-black uppercase no-underline transition-[top] duration-150 focus:top-4 focus:outline-2 focus:outline-offset-2 focus:outline-pink"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-1 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%270_0_256_256%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id=%27n%27%3E%3CfeTurbulence_type=%27fractalNoise%27_baseFrequency=%270.9%27_numOctaves=%274%27_stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect_width=%27100%25%27_height=%27100%25%27_filter=%27url(%23n)%27/%3E%3C/svg%3E')] bg-size-[200px] opacity-[0.04] motion-reduce:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.03] motion-reduce:hidden after:absolute after:inset-x-0 after:h-[200px] after:bg-linear-to-b after:from-transparent after:via-cyan/50 after:to-transparent after:animate-[scanline_8s_linear_infinite] after:content-['']"
        />
        <NavBar />
        <div className="flex min-h-full min-w-0 flex-1 flex-col pt-20 sm:pt-24 md:pt-28">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
