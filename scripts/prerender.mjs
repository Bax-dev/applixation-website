import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DIST = path.resolve('dist')
const { render, indexableRoutes, SITE } = await import(path.join(process.cwd(), '.ssr/entry-server.js'))

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

/** Everything between the charset meta and </head> is generated per route. */
function buildPage(head, html) {
  return template
    .replace(/<title>.*?<\/title>\s*/s, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/, '')
    // Per-route tags replace the static defaults, so drop those rather than emit both.
    .replace(/<meta\b[^>]*?(?:property="og:[^"]*"|name="twitter:[^"]*")[^>]*>\s*/g, '')
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

const written = []

for (const route of indexableRoutes) {
  const { html, head } = render(route.path)
  const outDir = route.path === '/' ? DIST : path.join(DIST, route.path)
  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'index.html'), buildPage(head, html))
  written.push(route.path)
}

// A static 404 for hosts that serve one, still hydrating into the SPA router.
const notFound = render('/404')
await writeFile(path.join(DIST, '404.html'), buildPage(notFound.head, notFound.html))

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes
  .map(
    (route) =>
      `  <url>\n    <loc>${SITE.url}${route.path === '/' ? '/' : route.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)

console.log(`prerendered ${written.length} routes + 404.html, sitemap.xml (${written.join(', ')})`)
