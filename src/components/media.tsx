import { Parallax } from '@/components/motion'

/**
 * Framed photography.
 *
 * Every image is cropped by its frame rather than sized by its own aspect ratio, so the frame
 * always carries an aspect class and the image fills it absolutely. That keeps the grids honest
 * and means no layout shift while the file loads.
 */

/** Warms the frame while the file loads, and sits under the photo as its shadow colour afterwards. */
const FRAME = 'relative overflow-hidden bg-navy/10'

/** Photography runs warm and busy; a navy wash settles it into the palette and keeps overlaid text legible. */
const TINTS = {
  none: '',
  navy: 'after:pointer-events-none after:absolute after:inset-0 after:bg-navy/35 after:mix-blend-multiply',
  deep: 'after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-t after:from-navy after:via-navy/55 after:to-navy/10',
} as const

type FigureProps = {
  src: string
  alt: string
  /** Aspect and radius for the frame, e.g. `aspect-[4/3] rounded-2xl`. */
  className?: string
  tint?: keyof typeof TINTS
  /** Scales the photo inside its frame on hover. Needs a `group` ancestor. */
  zoom?: boolean
  /** Above the fold: skip lazy loading so the browser can start it with the document. */
  priority?: boolean
}

export function Figure({ src, alt, className = '', tint = 'none', zoom = false, priority = false }: FigureProps) {
  return (
    <div className={`${FRAME} ${TINTS[tint]} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`absolute inset-0 size-full object-cover ${zoom ? 'transition-transform duration-700 ease-out group-hover:scale-[1.06]' : ''}`}
      />
    </div>
  )
}

/**
 * A figure that drifts against the page as it scrolls. The photo is held taller than its frame by
 * exactly the travel distance at each edge, so the drift never uncovers one.
 */
export function ParallaxFigure({ src, alt, className = '', tint = 'none', priority = false, distance = 44 }: FigureProps & { distance?: number }) {
  return (
    <Parallax className={`${FRAME} ${TINTS[tint]} ${className}`} distance={distance}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="absolute inset-x-0 w-full object-cover"
        style={{ top: -distance, height: `calc(100% + ${distance * 2}px)` }}
      />
    </Parallax>
  )
}
