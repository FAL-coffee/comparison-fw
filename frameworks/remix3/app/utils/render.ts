import { renderToString } from '../lib/remix-component/stream'

import type { RemixNode } from '@remix-run/component'
import { createHtmlResponse } from '@remix-run/response/html'

export async function render(node: RemixNode, init?: ResponseInit) {
  let html = await renderToString(node)
  return createHtmlResponse(html, init)
}
