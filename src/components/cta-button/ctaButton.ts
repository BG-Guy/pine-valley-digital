// CTA button: a lemon press button (components/press) sized for the navbar
// and the mobile menu — "Start a project". Styles in ctaButton.css.
import './ctaButton.css'

interface CtaButtonOptions {
  href: string
  label: string
  // Extra classes for placement/visibility (e.g. hide on mobile).
  className?: string
}

// Markup: the press wrapper paints the shadow; the face carries the label.
export const renderCtaButton = ({ href, label, className = '' }: CtaButtonOptions) => `
          <a href="${href}" class="btn-cta nb-press nb-lemon ${className}">
            <span class="nb-face btn-cta-face">${label}</span>
          </a>
`
