import { createRouter } from '@remix-run/fetch-router'
import { asyncContext } from '@remix-run/async-context-middleware'
import { compression } from '@remix-run/compression-middleware'
import { logger } from '@remix-run/logger-middleware'
import { methodOverride } from '@remix-run/method-override-middleware'
import { staticFiles } from '@remix-run/static-middleware'

import { routes } from './routes.ts'

// import adminController from './admin.tsx'
// import { uploadsAction } from './uploads.tsx'

let middleware = []

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger())
}

middleware.push(compression())
middleware.push(
  staticFiles('./public', {
    cacheControl: 'no-store, must-revalidate',
    etag: false,
    lastModified: false,
  }),
)
middleware.push(methodOverride())
middleware.push(asyncContext())

export let router = createRouter({ middleware })

// router.get(routes.uploads, uploadsAction)

// router.map(routes.home, marketingController.home)
