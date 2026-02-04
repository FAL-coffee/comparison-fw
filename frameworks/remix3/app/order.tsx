import type { Controller } from '@remix-run/fetch-router'
import { fetchOrder, fetchOrderHistory, fetchOrders } from '@comparison-fw/shared'

import { routes } from './routes.ts'
import { render } from './utils/render.ts'
import { Document } from './layout.tsx'
import Orders from './routes/orders.tsx'
import OrderDetail from './routes/orderDetail.tsx'
import OrderEdit from './routes/orderEdit.tsx'

export default {
    async index() {
        const data = await fetchOrders({})
        return render(
            <Document>
                <Orders orders={data.items} />
            </Document>
        )
    },
    async detail({ params }) {
        const [data, history] = await Promise.all([
            fetchOrder(params.id),
            fetchOrderHistory(params.id)
        ])

        return render(
            <Document>
                <OrderDetail order={data} history={history} />
            </Document>
        )
    },
    async edit({ params }) {
        const data = await fetchOrder(params.id)
        return render(
            <Document>
                <OrderEdit order={data} />
            </Document>
        )
    }
} satisfies Controller<typeof routes.order>
