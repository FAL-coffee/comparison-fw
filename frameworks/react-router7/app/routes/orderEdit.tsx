import { useState } from "react";
import {
  useLoaderData,
  useNavigation,
  Link,
  Form,
  redirect,
  useRouteError,
  isRouteErrorResponse,
  useActionData,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "react-router";
import {
  fetchOrder,
  updateOrder,
  ApiError,
  type OrderStatus,
} from "@comparison-fw/shared";

export const meta = () => [{ title: "ステータス更新 - React Router 7" }];

export async function loader({ params }: LoaderFunctionArgs) {
  const orderId = params.orderId!;

  try {
    const order = await fetchOrder(orderId);
    if (!order) {
      throw new Response("注文が見つかりません", { status: 404 });
    }
    return { order };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Response(error.message, { status: error.status });
    }
    throw error;
  }
}

export async function action({ params, request }: ActionFunctionArgs) {
  const orderId = params.orderId!;
  const formData = await request.formData();

  const status = formData.get("status") as OrderStatus;
  const memo = formData.get("memo") as string;

  try {
    await updateOrder({ id: orderId, status, memo });
    return redirect(`/orders/${orderId}`);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "更新に失敗しました" };
  }
}

export default function OrderStatusUpdate() {
  const { order } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [memo, setMemo] = useState(order.memo);

  return (
    <div className="p-6 space-y-6 max-w-lg">
      <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
        ← 詳細へ戻る
      </Link>

      <div className="border rounded-lg p-6">
        <h1 className="text-xl font-bold mb-4">ステータス更新</h1>

        <div className="mb-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">注文ID: {order.id}</p>
          <p className="font-medium">{order.title}</p>
        </div>

        {actionData?.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ステータス</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="NEW">新規</option>
              <option value="IN_PROGRESS">進行中</option>
              <option value="DONE">完了</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              メモ {status === "DONE" && <span className="text-red-500">*</span>}
            </label>
            <textarea
              name="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={4}
              className="w-full border rounded px-3 py-2"
              placeholder={status === "DONE" ? "完了時はメモ必須" : ""}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "更新中..." : "更新"}
            </button>
            <Link
              to={`/orders/${order.id}`}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              キャンセル
            </Link>
          </div>
        </Form>
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
