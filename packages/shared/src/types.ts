export type OrderStatus = 'NEW' | 'IN_PROGRESS' | 'DONE';

export interface Order {
  id: string;
  title: string;
  status: OrderStatus;
  memo: string;
  updatedAt: string;
}

export interface OrderHistory {
  id: string;
  at: string;
  message: string;
}

export interface GetOrdersParams {
  q?: string;
  status?: OrderStatus;
}

export interface GetOrdersResult {
  items: Order[];
  total: number;
}

export interface UpdateStatusInput {
  id: string;
  status: OrderStatus;
  memo: string;
}

export interface ApiOptions {
  delay?: number;
  fail?: 404 | 422 | 500;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
