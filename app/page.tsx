import { HeroSection } from "@/components/hero-section"
import { ProjectsOverviewGrid } from "@/components/projects-overview-grid"
import { PlatformOverview } from "@/components/platform-overview"
import { ProjectsSection } from "@/components/projects-section"
import { ImpactSection } from "@/components/impact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4f8fc_0%,#fbfdff_34%,#ffffff_100%)]">
      <HeroSection />
      <ProjectsOverviewGrid />
      <PlatformOverview />
      <ProjectsSection />
      <ImpactSection />
      <Footer />
    </main>
  )
}
