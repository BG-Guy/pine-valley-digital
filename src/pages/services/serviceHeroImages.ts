// The illustration on the right of each service page's hero (used by
// serviceLandingPage.ts). Compressed copies live in assets/service-heroes.
// Four services have no drawing of their own yet, so they borrow the
// closest one; give them their own file here when there is one.
import webDesign from '../../assets/service-heroes/web-design-hero.webp'
import webDev from '../../assets/service-heroes/web-dev-hero.webp'
import brand from '../../assets/service-heroes/brand-identity-hero.webp'
import seo from '../../assets/service-heroes/seo-hero.webp'
import automation from '../../assets/service-heroes/automation-hero.webp'
import ecommerce from '../../assets/service-heroes/ecommerce-hero-cart.webp'
import payments from '../../assets/service-heroes/payments-hero.webp'
import analytics from '../../assets/service-heroes/business-analytic-hero.webp'
import review from '../../assets/service-heroes/review-hero.webp'
import faster from '../../assets/service-heroes/faster-hero.webp'

export interface HeroImage {
  src: string
  width: number
  height: number
}

const square = (src: string): HeroImage => ({ src, width: 960, height: 960 })
const wide = (src: string): HeroImage => ({ src, width: 960, height: 536 })

export const SERVICE_HERO_IMAGES: Record<string, HeroImage> = {
  'web-design': square(webDesign),
  'development': wide(webDev),
  'brand-identity': wide(brand),
  'seo-performance': wide(seo),
  'business-automation': square(automation),
  'ecommerce': wide(ecommerce),
  'booking-payments': wide(payments),
  'analytics-tracking': wide(analytics),
  'reviews-reputation': wide(review),
  // Beating the old site builders on the podium: leaving them behind.
  'redesign-migration': wide(faster),
  // Borrowed until they get their own drawing.
  'local-seo': wide(seo),
  'ai-assistants': square(automation),
  'care-maintenance': wide(webDev),
  'accessibility': square(webDesign),
}
