import type { Handle } from "@remix-run/component";
import type { Order, OrderHistory } from "@comparison-fw/shared";
import { routes } from "../routes";

type Props = {
    order: Order;
    history: OrderHistory[];
};

export default function OrderDetail(_: Handle) {
    return ({ order, history }: Props) => (
        <div className="p-6 space-y-6">
            <a href={routes.order.index.href()} className="text-blue-600 hover:underline">
                ← 一覧へ戻る
            </a>

            <div className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">{order.title}</h1>
                        <p className="text-gray-500">{order.id}</p>
                    </div>
                    <a
                        href={routes.order.edit.href({ id: order.id })}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        ステータスを更新
                    </a>
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
};
