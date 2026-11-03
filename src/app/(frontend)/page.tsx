import { JsonLd } from '@/components/json-ld'
import { AboutSection } from '@/components/sections/about-section'
import { ContactCta } from '@/components/sections/contact-cta'
import { ExperienceTimeline } from '@/components/sections/experience-timeline'
import { FeaturedProjects } from '@/components/sections/featured-projects'
import { HeroSection } from '@/components/sections/hero-section'
import { SkillsGrid } from '@/components/sections/skills-grid'
import { getExperience } from '@/lib/cms/experience'
import { getAbout, getHero, getSiteSettings } from '@/lib/cms/globals'
import { populated } from '@/lib/cms/media'
import { getFeaturedProjects, getProjects } from '@/lib/cms/projects'
import { getSkills } from '@/lib/cms/skills'
import { buildMetadata } from '@/lib/seo'
import { siteUrl } from '@/lib/site'

export function generateMetadata() {
  return buildMetadata({ path: '/' })
}

export default async function HomePage() {
  const [hero, settings, about, featured, projects, experience, skills] = await Promise.all([
    getHero(),
    getSiteSettings(),
    getAbout(),
    getFeaturedProjects(),
    getProjects(),
    getExperience(),
    getSkills(),
  ])

  // NFR-12: Person structured data.
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    jobTitle: settings.title,
    url: siteUrl,
    address: settings.location
      ? { '@type': 'PostalAddress', addressLocality: settings.location }
      : undefined,
    sameAs: (settings.socials ?? [])
      .map((social) => social.url)
      .filter((url) => /^https?:/.test(url)),
    knowsAbout: skills.map((skill) => skill.name),
  }

  return (
    <>
      <JsonLd data={person} />
      <HeroSection
        hero={hero}
        settings={settings}
        hasResume={Boolean(populated(settings.resume)?.url)}
      />
      <FeaturedProjects projects={featured} />
      <AboutSection about={about} settings={settings} />
      <ExperienceTimeline entries={experience} projects={projects} />
      <SkillsGrid skills={skills} />
      <ContactCta settings={settings} />
    </>
  )
}
