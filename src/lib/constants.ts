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

/** Master switch — featured badge under the top pill nav; set `false` after the launch window. */
export const PRODUCT_HUNT_EMBED_ENABLED = true
