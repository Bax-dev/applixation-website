import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Restores the top of the page on navigation, which the browser does not do for client-side routing. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
