export const APP_STORE_URLS = {
  en: 'https://apps.apple.com/tr/app/tadado/id6753135485',
  tr: 'https://apps.apple.com/tr/app/tadado/id6753135485?l=tr',
  de: 'https://apps.apple.com/tr/app/tadado/id6753135485?l=de',
  fr: 'https://apps.apple.com/tr/app/tadado/id6753135485?l=fr',
  es: 'https://apps.apple.com/tr/app/tadado/id6753135485?l=es'
} as const

/** Tadado on Product Hunt — launch URL with referral params. */
export const PRODUCT_HUNT_URL =
  'https://www.producthunt.com/products/tadado-ai-word-guessing-game?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-tadado-ai-word-guessing-game'

/** Official 250×54 Product Hunt embed badge image (dark theme). */
export const PRODUCT_HUNT_BADGE_SRC =
  'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1146730&theme=dark'

/** ISO date of the launch — used as the dismissal key suffix. */
export const PRODUCT_HUNT_LAUNCH_DATE = '2026-05-15'

/** Master switch — set to `false` once the launch window ends. */
export const PRODUCT_HUNT_BANNER_ENABLED = true
