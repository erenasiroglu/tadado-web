/** Blog yazıları yalnızca EN ve TR; diğer yerel arayüz dillerinde içerik dili */
export function getBlogContentLocale(locale: string): 'en' | 'tr' {
  return locale === 'tr' ? 'tr' : 'en'
}

export function uiDateLocaleTag(locale: string): string {
  switch (locale) {
    case 'tr':
      return 'tr-TR'
    case 'de':
      return 'de-DE'
    case 'fr':
      return 'fr-FR'
    case 'es':
      return 'es-ES'
    default:
      return 'en-US'
  }
}
