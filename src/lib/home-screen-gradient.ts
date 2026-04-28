export const homeScreenGradient = {
  colors: ['#0A0514', '#2A0A3B', '#3D1F58'] as const,
  locations: [0, 0.4, 1] as const,
  start: { x: 0, y: 0 },
  end: { x: 0.38, y: 1 },
} as const

/**
 * CSS `background-image` matching expo-linear-gradient with the same start/end/locations.
 * Angle: vector (end - start) in unit box; 0° = up in CSS, clockwise.
 */
export function homeScreenGradientBackgroundImage(): string {
  const { colors, locations, start, end } = homeScreenGradient
  const dx = end.x - start.x
  const dy = end.y - start.y
  const angleDeg = 180 - (Math.atan(dx / dy) * 180) / Math.PI
  const [c0, c1, c2] = colors
  const [l0, l1, l2] = locations
  return `linear-gradient(${angleDeg}deg, ${c0} ${l0 * 100}%, ${c1} ${l1 * 100}%, ${c2} ${l2 * 100}%)`
}
