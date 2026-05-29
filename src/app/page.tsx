import { HeroSection } from '@/components/hero-section'

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-full w-full min-w-0 flex-1 flex-col overflow-x-hidden"
    >
      <HeroSection />
    </main>
  )
}
