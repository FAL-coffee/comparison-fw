import type { Order, OrderStatus } from './types';
import { ERROR_IDS } from './constants';

const titles = [
  'Webサイトリニューアル',
  'モバイルアプリ開発',
  'データベース移行',
  'API連携',
  'セキュリティ監査',
];

const memos = [
  '初期設定完了、レビュー待ち',
  '開発準備完了',
  '外部API待ち',
  'テスト中',
  '',
];

const statuses: OrderStatus[] = ['NEW', 'IN_PROGRESS', 'DONE', 'NEW', 'IN_PROGRESS'];

function formatId(num: number): string {
  return `o-${String(num).padStart(4, '0')}`;
}

export function seedOrders(): Order[] {
  const orders: Order[] = [];

  for (let i = 0; i < 5; i++) {
    orders.push({
      id: formatId(i + 1),
      title: titles[i],
      status: statuses[i],
      memo: memos[i],
      updatedAt: new Date(2025, 0, 15 - i).toISOString(),
    });
  }

  // エラーテスト用
  orders.push({
    id: ERROR_IDS.NOT_FOUND,
    title: 'エラーテスト - 404',
    status: 'NEW',
    memo: '詳細取得で404エラー',
    updatedAt: new Date(2025, 0, 10).toISOString(),
  });

  orders.push({
    id: ERROR_IDS.INTERNAL_ERROR,
    title: 'エラーテスト - 500',
    status: 'NEW',
    memo: '詳細取得で500エラー',
    updatedAt: new Date(2025, 0, 10).toISOString(),
  });

  orders.push({
    id: ERROR_IDS.VALIDATION_ERROR,
    title: 'エラーテスト - 422',
    status: 'NEW',
    memo: '更新で422エラー',
    updatedAt: new Date(2025, 0, 10).toISOString(),
  });

  return orders;
}
