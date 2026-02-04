import type { Handle } from "@remix-run/component";
import type { Order } from "@comparison-fw/shared";
import { routes } from "../routes";

type Props = {
    order: Order;
    error?: string;
};

export default function OrderEdit(_: Handle) {
    return ({ order, error }: Props) => (
        <div className="p-6 space-y-6 max-w-lg">
            <a href={routes.order.detail.href({ id: order.id })} className="text-blue-600 hover:underline">
                ← 詳細へ戻る
            </a>

            <div className="border rounded-lg p-6">
                <h1 className="text-xl font-bold mb-4">ステータス更新</h1>

                <div className="mb-6 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-500">注文ID: {order.id}</p>
                    <p className="font-medium">{order.title}</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form method="post" className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">ステータス</label>
                        <select
                            name="status"
                            defaultValue={order.status}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="NEW">新規</option>
                            <option value="IN_PROGRESS">進行中</option>
                            <option value="DONE">完了</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            メモ
                        </label>
                        <textarea
                            name="memo"
                            defaultValue={order.memo}
                            rows={4}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            更新
                        </button>
                        <a
                            href={routes.order.detail.href({ id: order.id })}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            キャンセル
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
