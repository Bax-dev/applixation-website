import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  AdditiveBlending,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Line,
  LineBasicMaterial,
  MathUtils,
  Vector3,
} from 'three'
import type { Group, Mesh, Points } from 'three'

/**
 * The WebGL backdrops. This module is the lazy half of `scene.tsx` — nothing here is imported
 * from a page directly, so three.js only reaches the browser once a section that uses it is
 * close to the viewport.
 *
 * Both scenes are decoration behind text: additive blending on the navy sections, no lighting,
 * no shadows, and pointer events left to the DOM above them.
 */

const ORANGE = new Color('#f2913f')
const PALE = new Color('#c3e1e3')

/** Frame-rate independent approach, so the parallax feels the same on a 60Hz and a 120Hz display. */
const DAMP = 3

function latLonToVector3(lat: number, lon: number, radius = 1) {
  const phi = MathUtils.degToRad(90 - lat)
  const theta = MathUtils.degToRad(lon + 180)
  return new Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta))
}

/**
 * Johannesburg out to the AWS regions the work usually touches. The arcs are the point of the
 * scene, so they are real routes rather than random pairs — the globe reads as a map, not a toy.
 */
const HOME = { lat: -26.2, lon: 28.0 }
const REGIONS = [
  { lat: 53.3, lon: -6.3 }, // Ireland
  { lat: 38.9, lon: -77.0 }, // N. Virginia
  { lat: 50.1, lon: 8.7 }, // Frankfurt
  { lat: 1.35, lon: 103.8 }, // Singapore
  { lat: -23.5, lon: -46.6 }, // São Paulo
  { lat: 19.1, lon: 72.9 }, // Mumbai
  { lat: -33.9, lon: 151.2 }, // Sydney
]

/** Points spread evenly over the sphere: the globe's body, with every seventh node picked out in orange. */
function Nodes({ count = 1800 }: { count?: number }) {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    const tint = new Color()

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const ring = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      positions.set([Math.cos(theta) * ring, y, Math.sin(theta) * ring], i * 3)
      tint.copy(i % 7 === 0 ? ORANGE : PALE).multiplyScalar(0.45 + Math.random() * 0.55)
      colors.set([tint.r, tint.g, tint.b], i * 3)
    }

    return { positions, colors }
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} sizeAttenuation vertexColors transparent opacity={0.85} depthWrite={false} blending={AdditiveBlending} />
    </points>
  )
}

/**
 * One great-circle route, lifted off the surface so it arcs rather than hugs. The line itself is
 * built imperatively: a plain `THREE.Line` avoids the JSX `<line>` element, which collides with
 * SVG's in TypeScript.
 */
function useRoutes() {
  return useMemo(() => {
    const home = latLonToVector3(HOME.lat, HOME.lon)

    return REGIONS.map((region, index) => {
      const target = latLonToVector3(region.lat, region.lon)
      const lift = 0.14 + home.distanceTo(target) * 0.12
      const points = Array.from({ length: 65 }, (_, step) => {
        const t = step / 64
        return home.clone().lerp(target, t).normalize().multiplyScalar(1 + Math.sin(Math.PI * t) * lift)
      })

      const curve = new CatmullRomCurve3(points)
      const line = new Line(
        new BufferGeometry().setFromPoints(points),
        new LineBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.38, blending: AdditiveBlending, depthWrite: false }),
      )

      return { line, curve, target, offset: index / REGIONS.length }
    })
  }, [])
}

/** A packet running the route, so the arcs read as traffic rather than as drawn lines. */
function Pulse({ curve, offset }: { curve: CatmullRomCurve3; offset: number }) {
  const mesh = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = (clock.elapsedTime * 0.14 + offset) % 1
    mesh.current.position.copy(curve.getPointAt(t))
    // Fades in and out at the ends of the run so packets appear to depart and arrive.
    mesh.current.scale.setScalar(0.4 + Math.sin(Math.PI * t) * 0.6)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.022, 10, 10]} />
      <meshBasicMaterial color={ORANGE} transparent opacity={0.9} blending={AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

function Globe() {
  const group = useRef<Group>(null)
  const routes = useRoutes()

  useFrame((state, delta) => {
    const globe = group.current
    if (!globe) return
    globe.rotation.y += delta * 0.055
    // A shallow tilt that follows the cursor: enough to feel alive, not enough to distract.
    globe.rotation.x = MathUtils.damp(globe.rotation.x, 0.26 + state.pointer.y * 0.18, DAMP, delta)
    globe.rotation.z = MathUtils.damp(globe.rotation.z, state.pointer.x * 0.08, DAMP, delta)
  })

  return (
    <group ref={group} rotation={[0.26, 0, 0]}>
      <Nodes />
      {routes.map(({ line, curve, target, offset }, index) => (
        <group key={index}>
          <primitive object={line} />
          <Pulse curve={curve} offset={offset} />
          <mesh position={target}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshBasicMaterial color={ORANGE} transparent opacity={0.95} blending={AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
      {/* Two orbits, off-axis from each other, to give the sphere a sense of scale. */}
      <mesh rotation={[Math.PI / 2.1, 0, 0.3]}>
        <torusGeometry args={[1.34, 0.0035, 6, 200]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.3} blending={AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 2.9, 0.6, -0.5]}>
        <torusGeometry args={[1.52, 0.002, 6, 200]} />
        <meshBasicMaterial color={PALE} transparent opacity={0.16} blending={AdditiveBlending} />
      </mesh>
    </group>
  )
}

/** A field of points on a slow double sine, seen almost edge-on. Reads as a surface, costs almost nothing. */
function Waves({ side = 54, spacing = 0.19 }: { side?: number; spacing?: number }) {
  const points = useRef<Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(side * side * 3)
    const colors = new Float32Array(side * side * 3)
    const tint = new Color()
    const half = (side - 1) / 2

    for (let ix = 0; ix < side; ix++) {
      for (let iz = 0; iz < side; iz++) {
        const i = ix * side + iz
        positions.set([(ix - half) * spacing, 0, (iz - half) * spacing], i * 3)
        // Orange concentrated down the centre line, so the field carries the brand rather than wearing it.
        tint.copy(PALE).lerp(ORANGE, Math.max(0, 1 - Math.abs(ix - half) / (side * 0.28))).multiplyScalar(0.5)
        colors.set([tint.r, tint.g, tint.b], i * 3)
      }
    }

    return { positions, colors }
  }, [side, spacing])

  useFrame(({ clock }) => {
    const geometry = points.current?.geometry
    if (!geometry) return
    const array = geometry.attributes.position.array as Float32Array
    const t = clock.elapsedTime

    for (let i = 0; i < array.length; i += 3) {
      array[i + 1] = Math.sin(array[i] * 0.7 + t * 0.7) * 0.28 + Math.cos(array[i + 2] * 0.55 - t * 0.5) * 0.24
    }

    geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points} rotation={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} sizeAttenuation vertexColors transparent opacity={0.8} depthWrite={false} blending={AdditiveBlending} />
    </points>
  )
}

/** `frameloop` is the whole power story: offscreen, the canvas stops rendering rather than idling. */
const CANVAS_PROPS = {
  dpr: [1, 1.75] as [number, number],
  gl: { antialias: true, alpha: true, powerPreference: 'high-performance' as const },
  style: { pointerEvents: 'none' as const },
}

export function GlobeScene({ active }: { active: boolean }) {
  return (
    <Canvas {...CANVAS_PROPS} frameloop={active ? 'always' : 'never'} camera={{ position: [0, 0, 3.15], fov: 42 }}>
      <Globe />
    </Canvas>
  )
}

export function WaveScene({ active }: { active: boolean }) {
  return (
    <Canvas
      {...CANVAS_PROPS}
      frameloop={active ? 'always' : 'never'}
      // Tilted down onto the field rather than aimed at the horizon: the default camera does not
      // look at the origin on its own, so the pitch is set here to match the raised position.
      camera={{ position: [0, 1.6, 4.2], rotation: [-0.36, 0, 0], fov: 45 }}
    >
      <group position={[0, -0.4, 0]}>
        <Waves />
      </group>
    </Canvas>
  )
}
