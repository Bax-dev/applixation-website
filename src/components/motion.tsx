import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { Variants } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Scroll choreography for the marketing pages.
 *
 * Two rules keep this safe alongside the prerender in `scripts/prerender.mjs`:
 *
 * 1. The server and the first client render must produce the same markup, so nothing here branches
 *    on `window` during render. Anything that can only be known in the browser — the reduced-motion
 *    preference, scroll position — is applied after mount, via `useMounted`.
 * 2. Revealed elements are prerendered at `opacity: 0`, so `index.html` carries a `<noscript>` rule
 *    that unhides `[data-reveal]`. Keep the attribute on anything that starts hidden.
 */

/** Long tail-out. Movement arrives quickly and settles, rather than easing evenly the whole way. */
const EASE = [0.22, 1, 0.36, 1] as const

/** Fires a little before the element is fully on screen, so the motion reads as arrival, not as a jolt. */
const VIEWPORT = { once: true, margin: '-12% 0px -8% 0px' } as const

/** `custom` carries the delay so the variant keeps its own duration and easing. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } }),
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({ opacity: 1, transition: { duration: 0.9, ease: EASE, delay } }),
}

/** True only after hydration, so scroll- and preference-driven styles never differ from the prerendered HTML. */
function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Opacity only — for large images and full-bleed panels, where a translate would read as a wobble. */
  soft?: boolean
}

/** Reveals its children once, the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, soft = false }: RevealProps) {
  return (
    <motion.div
      data-reveal
      className={className}
      variants={soft ? fadeIn : fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

/** Parent for a list or grid: children mounted as `<StaggerItem>` arrive one after the other. */
export function Stagger({ children, className, gap = 0.08, delay = 0 }: { children: ReactNode; className?: string; gap?: number; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, soft = false }: { children: ReactNode; className?: string; soft?: boolean }) {
  return (
    <motion.div data-reveal className={className} variants={soft ? fadeIn : fadeUp}>
      {children}
    </motion.div>
  )
}

/**
 * Moves its children against the page as the wrapper crosses the viewport. The wrapper is the
 * measured element, so give it the final size and let the child overflow it (see `<Figure>`).
 */
export function Parallax({ children, className, distance = 40 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.35 })

  return (
    <div ref={ref} className={className}>
      <motion.div className="size-full" style={{ y: mounted && !reduce ? y : 0 }}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Counts up to the value the first time it is seen. The prerendered markup carries the real number,
 * and the count only replaces it after mount — a crawler or a reader without JavaScript sees `3.2×`,
 * never `0`. The reveal it sits inside is still fading in when the count starts, so there is no flash.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (!inView || reduce) return
    // Prefix and suffix are carried through untouched, so `3.2×`, `99.99%` and `12+` all animate.
    const parts = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value)
    if (!parts) return

    const [, prefix, digits, suffix] = parts
    const decimals = (digits.split('.')[1] ?? '').length
    const count = animate(0, Number(digits), {
      duration: 1.3,
      ease: EASE,
      onUpdate: (current) => setShown(`${prefix}${current.toFixed(decimals)}${suffix}`),
      onComplete: () => setShown(value),
    })

    return () => count.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}

/** Lifts on hover and settles with a spring, for cards that link somewhere. */
export const hoverLift = {
  whileHover: { y: -6, transition: { type: 'spring' as const, stiffness: 320, damping: 22 } },
  whileTap: { y: -2 },
}

export { motion }
