export const locales = ['en', 'tr', 'de', 'fr', 'es'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
