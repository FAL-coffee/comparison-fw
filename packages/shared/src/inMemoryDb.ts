import type {
  Order,
  OrderHistory,
  GetOrdersParams,
  GetOrdersResult,
  UpdateStatusInput,
} from './types';
import { seedOrders } from './seed';

let orders: Order[] = seedOrders();

const historyMessages = [
  '注文を作成しました',
  'ステータスを進行中に変更しました',
  '開発チームにアサインしました',
  'コードレビューを依頼しました',
  'ステータスを完了に変更しました',
];

export function getOrders(params: GetOrdersParams = {}): GetOrdersResult {
  const { q, status } = params;

  let filtered = [...orders];

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.title.toLowerCase().includes(query) ||
        order.memo.toLowerCase().includes(query)
    );
  }

  if (status) {
    filtered = filtered.filter((order) => order.status === status);
  }

  return { items: filtered, total: filtered.length };
}

export function getOrder(id: string): Order | null {
  return orders.find((order) => order.id === id) ?? null;
}

export function getOrderHistory(id: string): OrderHistory[] {
  const order = getOrder(id);
  if (!order) {
    return [];
  }

  const seed = id.charCodeAt(id.length - 1);
  const count = 2 + (seed % 3);
  const history: OrderHistory[] = [];

  for (let i = 0; i < count; i++) {
    const daysAgo = count - i;
    const date = new Date('2025-01-15T10:00:00Z');
    date.setDate(date.getDate() - daysAgo * 5);

    history.push({
      id: `h-${id}-${i + 1}`,
      at: date.toISOString(),
      message: historyMessages[i % historyMessages.length],
    });
  }

  return history;
}

export function updateOrderStatus(input: UpdateStatusInput): Order {
  const { id, status, memo } = input;

  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) {
    throw new Error(`Order not found: ${id}`);
  }

  const updatedOrder: Order = {
    ...orders[index],
    status,
    memo,
    updatedAt: new Date().toISOString(),
  };

  orders[index] = updatedOrder;
  return updatedOrder;
}

export function resetDb(): void {
  orders = seedOrders();
}
