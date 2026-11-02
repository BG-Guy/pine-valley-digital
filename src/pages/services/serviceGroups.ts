// The 14 services in four groups, the way visitors shop for them: building
// the site, getting found, saving time, and keeping it healthy. Used by the
// navbar's Services menu, the footer and each service page's "related"
// links, so the grouping lives in one place.
import { servicesLandingData, type ServiceLandingData } from './servicesLandingData'

export interface ServiceGroup {
  title: string
  blurb: string
  slugs: string[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  { title: 'Build', blurb: 'A website that wins customers', slugs: ['web-design', 'development', 'ecommerce', 'redesign-migration', 'brand-identity'] },
  { title: 'Get found', blurb: 'Show up when people search', slugs: ['seo-performance', 'local-seo', 'reviews-reputation', 'analytics-tracking'] },
  { title: 'Automate', blurb: 'Less admin, faster replies', slugs: ['business-automation', 'ai-assistants', 'booking-payments'] },
  { title: 'Keep it running', blurb: 'Safe, fast and up to date', slugs: ['care-maintenance', 'accessibility'] },
]

export const serviceHref = (slug: string) => `/services/${slug}.html`

// A group's services, in the group's order.
export const servicesIn = (group: ServiceGroup): ServiceLandingData[] =>
  group.slugs.map((slug) => servicesLandingData.find((s) => s.slug === slug)).filter((s): s is ServiceLandingData => !!s)

export const groupOf = (slug: string) => SERVICE_GROUPS.find((g) => g.slugs.includes(slug))
