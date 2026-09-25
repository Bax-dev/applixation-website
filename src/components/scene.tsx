import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

import { SceneBoundary } from '@/components/scene-boundary'

/**
 * Mounts a WebGL backdrop into a section.
 *
 * three.js is a large dependency for decoration, so it is never part of the page bundle: the
 * scene is imported the first time its section comes within 200px of the viewport, and once
 * mounted it stops rendering whenever it scrolls away again. Visitors who ask for reduced motion
 * never load it at all, and a browser without WebGL falls back to the section's own background.
 */
const SCENES = {
  globe: lazy(() => import('@/components/three-scenes').then((module) => ({ default: module.GlobeScene }))),
  wave: lazy(() => import('@/components/three-scenes').then((module) => ({ default: module.WaveScene }))),
}

export function Scene({ name, className = '' }: { name: keyof typeof SCENES; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ entered, visible }, setState] = useState({ entered: false, visible: false })
  const reduce = useReducedMotion()
  const Canvas = SCENES[name]

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setState((previous) => ({ entered: previous.entered || entry.isIntersecting, visible: entry.isIntersecting })),
      { rootMargin: '200px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {entered && !reduce && (
        <SceneBoundary fallback={null}>
          <Suspense fallback={null}>
            <Canvas active={visible} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  )
}
