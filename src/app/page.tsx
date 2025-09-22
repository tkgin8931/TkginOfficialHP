import { HeroSection } from "./components/hero-section"
import { ProfileInfo } from "./components/profile-info"
import { ExperienceTimeline } from "./components/experience-timeline"
import MobileShowcase from "./components/mobileShowCase"


export default function Home() {
  return (
    <main>
      <ProfileInfo />
      <HeroSection />
      <MobileShowcase/>
      <ExperienceTimeline />
    </main>
  )
}