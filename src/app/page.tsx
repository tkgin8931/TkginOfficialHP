import { AudioHeroSection } from "./components/hero-section"
import { ProfileInfo } from "./components/profile-info"
import { ExperienceTimeline } from "./components/experience-timeline"
// import { ProjectsShowcase } from "./components/projects-showcase"
import { SkillsMatrix } from "./components/skills-matrix"

export default function Home() {
  return (
    <main>
      <AudioHeroSection />
      <ProfileInfo />
      <ExperienceTimeline />
      {/* <ProjectsShowcase /> */}
      <SkillsMatrix />
    </main>
  )
}