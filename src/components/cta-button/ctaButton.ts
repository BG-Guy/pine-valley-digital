// CTA button: the bordered pill with a bouncy lift and a sliding color fill
// on hover (styles in ctaButton.css). Used for the navbar's "Start a project".
import './ctaButton.css'

interface CtaButtonOptions {
  href: string
  label: string
  // Extra utility classes for placement/visibility (e.g. hide on mobile).
  className?: string
}

// Markup: outer link carries the border/shadow/lift; the inner clip layer
// hosts the sliding fill and the label.
export const renderCtaButton = ({ href, label, className = '' }: CtaButtonOptions) => `
          <a href="${href}" class="btn-cta ${className}">
            <span class="btn-cta-clip">
              <span class="btn-cta-bg"></span>
              <span class="btn-cta-label">${label}</span>
            </span>
          </a>
`
