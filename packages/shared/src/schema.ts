import { z } from 'zod';

export const OrderStatusSchema = z.enum(['NEW', 'IN_PROGRESS', 'DONE']);

export const OrderSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: OrderStatusSchema,
  memo: z.string(),
  updatedAt: z.string(),
});

export const UpdateStatusInputSchema = z.object({
  status: OrderStatusSchema,
  memo: z.string(),
}).refine(
  (data) => {
    if (data.status === 'DONE' && data.memo.trim() === '') {
      return false;
    }
    return true;
  },
  {
    message: 'DONE status requires a memo',
    path: ['memo'],
  }
);

export const GetOrdersParamsSchema = z.object({
  q: z.string().optional(),
  status: OrderStatusSchema.optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional(),
});

export type OrderSchemaType = z.infer<typeof OrderSchema>;
export type UpdateStatusInputSchemaType = z.infer<typeof UpdateStatusInputSchema>;
export type GetOrdersParamsSchemaType = z.infer<typeof GetOrdersParamsSchema>;
