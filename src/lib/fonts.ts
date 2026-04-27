import { Poppins } from 'next/font/google'

/** Hero başlık tipi — Poppins Black Italic, Türkçe için latin-ext */
export const poppinsBlackItalic = Poppins({
  weight: '900',
  style: 'italic',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins-black-italic',
  display: 'swap'
})
