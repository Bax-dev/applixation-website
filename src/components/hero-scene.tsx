import { Suspense, lazy, useEffect, useState } from 'react'

import { SceneBoundary } from '@/components/scene-boundary'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SCENE_URL = 'https://prod.spline.design/iyVbBHcg5MoNDyFB/scene.splinecode'

/**
 * The published scene is a whole landing-page template: it carries its own headline,
 * body copy and call-to-action laid out to the left of the sphere. We render the canvas
 * at a fixed pixel size so the scene always composes identically, then window onto the
 * sphere alone — everything else falls outside the crop.
 *
 * FOCUS is the sphere's centre within that fixed canvas. Re-measure it from a screenshot
 * if the scene is ever re-published with a different layout.
 */
const CANVAS = { width: 2000, height: 780 }
const FOCUS = { x: 1265, y: 387 }
const SCALE = 1.05

/**
 * Trims the window down to the sphere. `closest-side` makes the stops read against the box's
 * half-width rather than its diagonal, so the numbers mean what they look like: the sphere fills
 * ~63% of the radius, it stays fully opaque past that, and everything beyond 92% — the horizon
 * streaks and stray geometry the scene draws around the sphere — is cut away.
 */
const EDGE_FADE = 'radial-gradient(circle closest-side at 50% 50%, #000 68%, rgba(0,0,0,.65) 80%, transparent 92%)'

/** The sphere is dark teal on a dark navy section, so it needs a lift to separate from the background. */
const LIFT = 'brightness(1.28) contrast(1.06) saturate(1.12)'

/**
 * The published scene paints its own near-black page background, which reads as a patch sitting on
 * top of the navy section. Clearing it to transparent gives the hero one background instead of two:
 * the section colour, the halo and the grid overlay all carry straight through the canvas, so
 * nothing here has to be kept in sync with `--navy` by hand.
 */
function clearSceneBackground(app: Application) {
  app.setBackgroundColor('rgba(0,0,0,0)')
}

function Glow({ className = '' }: { className?: string }) {
  return <div className={`absolute -right-24 top-32 size-96 rounded-full bg-orange/15 blur-3xl ${className}`} />
}

/** Sits behind the sphere so its silhouette separates from the navy. */
function Halo() {
  return <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-[110px]" />
}

/** The scene animates continuously, so reduced-motion visitors get the glow and never load the runtime. */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(true)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefers(query.matches)
    const onChange = (event: MediaQueryListEvent) => setPrefers(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return prefers
}

export function HeroScene() {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) return <Glow />

  return (
    <SceneBoundary fallback={<Glow />}>
      {/* Small screens keep the glow; the scene only earns its weight where there is room for it. */}
      <Glow className="lg:hidden" />
      {/*
        The crop is a fixed 680px window onto the scene, so it is scaled as a whole rather than
        resized — resizing would clip the sphere instead of shrinking it. Anchoring the origin to
        the right keeps the sphere clear of the headline all the way down to 1024px.
      */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 hidden size-[680px] origin-right -translate-y-1/2 scale-[.66] lg:block xl:right-8 xl:scale-[.88] 2xl:scale-100"
        aria-hidden="true"
      >
        <Halo />
        <div className="absolute inset-0 overflow-hidden" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE, filter: LIFT }}>
          <Suspense fallback={null}>
            <div
              className="absolute left-1/2 top-1/2 origin-top-left"
              style={{ transform: `scale(${SCALE}) translate(${-FOCUS.x}px, ${-FOCUS.y}px)` }}
            >
              <Spline scene={SCENE_URL} onLoad={clearSceneBackground} style={{ width: CANVAS.width, height: CANVAS.height }} />
            </div>
          </Suspense>
        </div>
      </div>
    </SceneBoundary>
  )
}
