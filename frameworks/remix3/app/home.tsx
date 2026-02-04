import type { BuildAction } from '@remix-run/fetch-router'
import { redirect } from '@remix-run/response/redirect'

import { routes } from './routes.ts'

export let home: BuildAction<'GET', typeof routes.home> = {
    middleware: [],
    action() {
        return redirect(routes.order.index.href())
    },
}