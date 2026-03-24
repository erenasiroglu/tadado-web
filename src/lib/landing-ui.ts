/** Landing tokens: düzenli layout + mor/indigo oyun enerjisi + yumuşak gölgeler */
export const landing = {
  section: 'relative py-20 md:py-28 px-5 sm:px-6',
  band: 'border-t border-zinc-800/80 bg-zinc-900/25',
  inner: 'relative z-10 mx-auto max-w-3xl',
  innerWide: 'relative z-10 mx-auto max-w-5xl',
  /** Mor çerçeve, hafif parlama */
  badge:
    'inline-flex items-center rounded-full border border-indigo-500/35 bg-indigo-500/[0.12] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-200 shadow-[0_0_24px_-4px_rgba(99,102,241,0.35)]',
  title: 'text-center text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-[2.5rem]',
  /** Son kelime veya vurgu için (span içinde) */
  titleGradient: 'bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent',
  lead: 'mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-zinc-400 sm:text-lg',
  /** Kart: mor border + derinlik gölgesi */
  card:
    'rounded-2xl border border-indigo-500/20 bg-zinc-900/55 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5),0_0_40px_-15px_rgba(99,102,241,0.2)] ring-1 ring-inset ring-white/[0.04]',
  cardHover:
    'transition-shadow duration-300 hover:border-indigo-400/35 hover:shadow-[0_24px_56px_-18px_rgba(0,0,0,0.55),0_0_48px_-12px_rgba(139,92,246,0.22)]',
  subtleGrid:
    'pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,#a78bfa_1px,transparent_0)] [background-size:24px_24px]'
} as const

/** Hero / section blur lekeleri — class string parçaları */
export const landingOrbs = {
  heroPrimary:
    'absolute left-1/2 top-[28%] h-[min(72vw,560px)] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.14] blur-3xl',
  heroSecondary:
    'absolute right-[12%] top-[55%] h-[min(50vw,420px)] w-[min(55vw,480px)] rounded-full bg-violet-500/[0.1] blur-3xl',
  sectionCenter:
    'absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(95vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl',
  sectionCorner:
    'absolute -right-[20%] top-0 h-[min(60vw,400px)] w-[min(60vw,400px)] rounded-full bg-violet-500/[0.07] blur-3xl'
} as const
