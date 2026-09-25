import { Component } from 'react'
import type { ReactNode } from 'react'

/**
 * Without this, a browser that cannot create a WebGL context throws out of the renderer and
 * React unmounts the whole page, not just the canvas. Falling back keeps the site up.
 */
export class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
