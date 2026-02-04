import type { RemixNode } from '@remix-run/component'

import { routes } from './routes.ts'

export function Document() {
  return ({ title = '注文一覧 - Remix 3', children }: { title?: string; children?: RemixNode }) => (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script type="module" async src={routes.assets.href({ path: 'entry.js' })} />
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
