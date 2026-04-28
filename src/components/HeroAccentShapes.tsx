import type { CSSProperties } from 'react'

/**
 * Mobil uygulamadaki hero aksan bloklarıyla aynı ölçüler (dip / sağ/sol kayma).
 * İnce yuvarlatılmış dörtgenler — ek SVG veya fazla dekor yok.
 */

export const accentShapeTop: CSSProperties = {
  position: 'absolute',
  top: 70,
  right: -78,
  width: 270,
  height: 170,
  borderRadius: 58,
  backgroundColor: 'rgba(196, 181, 253, 0.16)',
  transform: 'rotate(-16deg)',
}

export const accentShapeMiddle: CSSProperties = {
  position: 'absolute',
  top: 258,
  left: -58,
  width: 224,
  height: 140,
  borderRadius: 52,
  backgroundColor: 'rgba(123, 97, 255, 0.14)',
  transform: 'rotate(14deg)',
}

export const accentShapeBottom: CSSProperties = {
  position: 'absolute',
  bottom: 140,
  right: -42,
  width: 186,
  height: 116,
  borderRadius: 42,
  backgroundColor: 'rgba(91, 33, 182, 0.15)',
  transform: 'rotate(-10deg)',
}

export function AccentShapeTop() {
  return <div className="pointer-events-none" style={accentShapeTop} aria-hidden />
}

export function AccentShapeMiddle() {
  return <div className="pointer-events-none" style={accentShapeMiddle} aria-hidden />
}

export function AccentShapeBottom() {
  return <div className="pointer-events-none" style={accentShapeBottom} aria-hidden />
}

export function HeroAccentShapes() {
  return (
    <>
      <AccentShapeTop />
      <AccentShapeMiddle />
      <AccentShapeBottom />
    </>
  )
}
