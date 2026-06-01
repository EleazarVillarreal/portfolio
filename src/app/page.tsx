import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { WorkSection } from '@/components/work-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  return (
    <main
      id="main-content"
      className="flex min-h-full w-full min-w-0 flex-1 flex-col overflow-x-hidden"
    >
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
