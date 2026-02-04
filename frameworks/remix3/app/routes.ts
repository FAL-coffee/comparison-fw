import { route } from '@remix-run/fetch-router'

export let routes = route({
  assets: '/assets/*path',
  home: '/',
  order: {
    index: '/orders',
    detail: '/orders/:id',
    edit: '/orders/:id/status',
  },
})
