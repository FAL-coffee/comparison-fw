import type {
  Order,
  OrderHistory,
  GetOrdersParams,
  GetOrdersResult,
  UpdateStatusInput,
  ApiOptions,
} from './types';
import { ApiError } from './types';
import { DEFAULT_DELAY, ERROR_IDS } from './constants';
import * as db from './inMemoryDb';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function applyOptions(options?: ApiOptions): Promise<void> {
  const delay = options?.delay ?? DEFAULT_DELAY;
  if (delay > 0) {
    await sleep(delay);
  }

  if (options?.fail) {
    switch (options.fail) {
      case 404:
        throw new ApiError(404, 'Not Found');
      case 422:
        throw new ApiError(422, 'Validation Error');
      case 500:
        throw new ApiError(500, 'Internal Server Error');
    }
  }
}

export async function fetchOrders(
  params: GetOrdersParams,
): Promise<GetOrdersResult> {
  return db.getOrders(params);
}

export async function fetchOrder(
  id: string,
): Promise<Order> {
  if (id === ERROR_IDS.INTERNAL_ERROR) {
    throw new ApiError(500, 'Internal Server Error');
  }

  if (id === ERROR_IDS.NOT_FOUND) {
    throw new ApiError(404, 'Order not found');
  }

  const order = db.getOrder(id);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  return order;
}

export async function fetchOrderHistory(
  orderId: string,
  options?: ApiOptions
): Promise<OrderHistory[]> {
  await applyOptions(options);

  const order = db.getOrder(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  return db.getOrderHistory(orderId);
}

export async function updateOrder(
  input: UpdateStatusInput,
  options?: ApiOptions
): Promise<Order> {
  await applyOptions(options);

  if (input.id === ERROR_IDS.VALIDATION_ERROR) {
    throw new ApiError(422, 'Update not allowed for this order');
  }

  if (input.status === 'DONE' && input.memo.trim() === '') {
    throw new ApiError(422, 'Memo is required when status is DONE');
  }

  const order = db.getOrder(input.id);
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  return db.updateOrderStatus(input);
}
