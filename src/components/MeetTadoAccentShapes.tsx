import type { CSSProperties } from 'react'

/**
 * Meet Tado bölümü — Hero ile aynı gradient üzerinde, farklı kompozisyon.
 * Dairesel “spot”, geniş kapsül ve köşe blokları; oyunsu ama sakin (retention).
 */

const blobGlow: CSSProperties = {
  position: 'absolute',
  top: '-6%',
  right: '8%',
  width: 'min(420px, 58vw)',
  height: 'min(420px, 58vw)',
  borderRadius: '50%',
  background: 'radial-gradient(circle at 35% 35%, rgba(167, 139, 250, 0.22) 0%, rgba(91, 33, 182, 0.06) 55%, transparent 72%)',
  transform: 'translateZ(0)'
}

const capsuleLeft: CSSProperties = {
  position: 'absolute',
  bottom: '14%',
  left: '-8%',
  width: 'min(340px, 78vw)',
  height: 112,
  borderRadius: 999,
  backgroundColor: 'rgba(139, 92, 246, 0.14)',
  transform: 'rotate(11deg)'
}

const slabRight: CSSProperties = {
  position: 'absolute',
  top: '38%',
  right: '-6%',
  width: 160,
  height: 260,
  borderRadius: 44,
  backgroundColor: 'rgba(196, 181, 253, 0.11)',
  transform: 'rotate(-18deg)'
}

const chipBottom: CSSProperties = {
  position: 'absolute',
  bottom: '8%',
  right: '18%',
  width: 'min(220px, 42vw)',
  height: 76,
  borderRadius: 38,
  backgroundColor: 'rgba(91, 33, 182, 0.16)',
  transform: 'rotate(8deg)'
}

export function MeetTadoAccentShapes() {
  return (
    <>
      <div className="pointer-events-none" style={blobGlow} aria-hidden />
      <div className="pointer-events-none opacity-90 sm:opacity-100" style={capsuleLeft} aria-hidden />
      <div className="pointer-events-none" style={slabRight} aria-hidden />
      <div className="pointer-events-none" style={chipBottom} aria-hidden />
    </>
  )
}
