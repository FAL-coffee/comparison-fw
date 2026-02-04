import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";
import { fetchOrders, parseApiOptionsFromUrl } from "@comparison-fw/shared";

export const meta: MetaFunction = () => {
  return [
    { title: "注文一覧 - Remix 2" },
    { name: "description", content: "注文の一覧を表示します" },
  ];
};

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const apiOptions = parseApiOptionsFromUrl(request.url);
  return fetchOrders({}, apiOptions);
};

export default function OrdersIndex() {
  const data = useLoaderData<typeof clientLoader>();

  return (
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
          {data.items.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">
                <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                  {order.id}
                </Link>
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
