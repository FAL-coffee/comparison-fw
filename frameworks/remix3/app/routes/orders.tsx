import type { Order } from "@comparison-fw/shared";
import { routes } from "../routes";
import type { Handle } from "@remix-run/component";

type Props = {
    orders: Order[];
};

export default function Orders(_: Handle) {
    return ({ orders }: Props) => (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">注文一覧</h1>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2 px-3">ID</th>
                        <th className="text-left py-2 px-3">タイトル</th>
                        <th className="text-left py-2 px-3">ステータス</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                                <a href={routes.order.detail.href({ id: order.id })} className="text-blue-600 hover:underline">
                                    {order.id}
                                </a>
                            </td>
                            <td className="py-2 px-3">{order.title}</td>
                            <td className="py-2 px-3">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
