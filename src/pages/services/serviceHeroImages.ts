// The illustration on the right of each service page's hero (used by
// serviceLandingPage.ts). Compressed copies with the white background cut
// out live in assets/service-heroes.
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

// Each drawing's own size (they're cut out and trimmed to the art).
const sized = (src: string, width: number, height: number): HeroImage => ({ src, width, height })
const IMG = {
  webDesign: sized(webDesign, 747, 788),
  webDev: sized(webDev, 805, 453),
  brand: sized(brand, 628, 451),
  seo: sized(seo, 917, 536),
  automation: sized(automation, 883, 880),
  ecommerce: sized(ecommerce, 789, 474),
  payments: sized(payments, 547, 431),
  analytics: sized(analytics, 863, 484),
  review: sized(review, 673, 519),
  faster: sized(faster, 763, 460),
}

export const SERVICE_HERO_IMAGES: Record<string, HeroImage> = {
  'web-design': IMG.webDesign,
  'development': IMG.webDev,
  'brand-identity': IMG.brand,
  'seo-performance': IMG.seo,
  'business-automation': IMG.automation,
  'ecommerce': IMG.ecommerce,
  'booking-payments': IMG.payments,
  'analytics-tracking': IMG.analytics,
  'reviews-reputation': IMG.review,
  // Beating the old site builders on the podium: leaving them behind.
  'redesign-migration': IMG.faster,
  // Borrowed until they get their own drawing.
  'local-seo': IMG.seo,
  'ai-assistants': IMG.automation,
  'care-maintenance': IMG.webDev,
  'accessibility': IMG.webDesign,
}
