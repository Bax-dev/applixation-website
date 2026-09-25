import { Analytics } from '@vercel/analytics/react'
import { Route, Routes } from 'react-router-dom'

import { ScrollToTop } from '@/components/scroll-to-top'
import { Seo } from '@/components/seo'
import { SiteFrame } from '@/components/site-shell'
import { routes } from '@/config/routes'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <Routes>
        <Route element={<SiteFrame />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
      {import.meta.env.PROD && <Analytics />}
    </>
  )
}
