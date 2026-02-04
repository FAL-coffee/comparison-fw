import {
  useLoaderData,
  Link,
  useRouteError,
  isRouteErrorResponse,
  type LoaderFunctionArgs,
} from "react-router";
import {
  fetchOrder,
  fetchOrderHistory,
  ApiError,
} from "@comparison-fw/shared";

export const meta = () => [{ title: "注文詳細 - React Router 7" }];

export async function loader({ params }: LoaderFunctionArgs) {
  const orderId = params.orderId!;

  try {
    const order = await fetchOrder(orderId);
    if (!order) {
      throw new Response("注文が見つかりません", { status: 404 });
    }
    const history = await fetchOrderHistory(orderId);
    return { order, history };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Response(error.message, { status: error.status });
    }
    throw error;
  }
}

export default function OrderDetail() {
  const { order, history } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 space-y-6">
      <Link to="/orders" className="text-blue-600 hover:underline">
        ← 一覧へ戻る
      </Link>

      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{order.title}</h1>
            <p className="text-gray-500">{order.id}</p>
          </div>
          <Link
            to={`/orders/${order.id}/status`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ステータスを更新
          </Link>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">ステータス</dt>
            <dd className="font-medium">{order.status}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">更新日時</dt>
            <dd>{new Date(order.updatedAt).toLocaleString("ja-JP")}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm text-gray-500">メモ</dt>
            <dd className="whitespace-pre-wrap">{order.memo || "なし"}</dd>
          </div>
        </dl>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">履歴</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">履歴がありません</p>
        ) : (
          <ul className="space-y-3">
            {history.map((entry) => (
              <li key={entry.id} className="border-l-2 border-gray-300 pl-4">
                <p>{entry.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.at).toLocaleString("ja-JP")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const message = isRouteErrorResponse(error) && status === 404
    ? "注文が見つかりません"
    : "エラーが発生しました";

  return (
    <div className="p-6 space-y-6">
      <Link to="/orders" className="text-blue-600 hover:underline">
        ← 一覧へ戻る
      </Link>
      <div className="text-center py-12">
        <p className="text-6xl font-bold text-gray-200">{status}</p>
        <p className="text-xl mt-4">{message}</p>
      </div>
    </div>
  );
}
