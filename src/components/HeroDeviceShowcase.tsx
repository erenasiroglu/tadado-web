import Image from 'next/image'

type Props = {
  altDecks: string
  altGame: string
  altAi: string
}

/** Figma device exportları (çerçeve yok). Sıra: desteler → canlı tur → AI ile deste (retention akışı). */
export function HeroDeviceShowcase({ altDecks, altGame, altAi }: Props) {
  return (
    <div className="relative mx-auto w-full max-lg:-mx-1 max-lg:scroll-pl-3 max-lg:scroll-pr-3 max-lg:px-2 lg:max-w-none">
      <div
        className={
          'flex items-end justify-start gap-3 overflow-x-auto overflow-y-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] ' +
          'snap-x snap-mandatory [&::-webkit-scrollbar]:hidden sm:gap-4 lg:justify-center lg:gap-0 lg:overflow-visible lg:pb-0'
        }
      >
        <DeviceCard
          src="/mobile-3.png"
          alt={altDecks}
          className="w-[min(42vmin,13rem)] snap-center sm:w-[min(44vmin,13.75rem)] lg:z-[1] lg:-mr-[min(1.85rem,4.25vw)] lg:w-[min(17.5vw,10.25rem)] lg:-rotate-[9deg] xl:w-[11.25rem]"
          sizes="(max-width: 1024px) 46vmin, 165px"
        />
        <DeviceCard
          src="/mobile-1.png"
          alt={altGame}
          className="w-[min(48vmin,14.75rem)] snap-center sm:w-[min(50vmin,15.25rem)] lg:z-30 lg:-mx-[min(0.85rem,2vw)] lg:w-[min(22.5vw,13.25rem)] lg:scale-[1.06] lg:shadow-[0_32px_72px_-18px_rgba(0,0,0,0.58)] xl:w-[13.5rem]"
          sizes="(max-width: 1024px) 52vmin, 220px"
          priority
        />
        <DeviceCard
          src="/mobile-2.png"
          alt={altAi}
          className="w-[min(42vmin,13rem)] snap-center sm:w-[min(44vmin,13.75rem)] lg:z-[2] lg:-ml-[min(1.85rem,4.25vw)] lg:w-[min(17.5vw,10.25rem)] lg:rotate-[9deg] xl:w-[11.25rem]"
          sizes="(max-width: 1024px) 46vmin, 165px"
        />
      </div>
    </div>
  )
}

function DeviceCard({
  src,
  alt,
  className,
  sizes,
  priority
}: {
  src: string
  alt: string
  className: string
  sizes: string
  priority?: boolean
}) {
  return (
    <figure className={`relative shrink-0 origin-bottom ${className}`}>
      <div className="relative aspect-[2060/4215] w-full overflow-hidden rounded-2xl lg:rounded-[1.35rem]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes={sizes}
          priority={priority}
        />
      </div>
    </figure>
  )
}
