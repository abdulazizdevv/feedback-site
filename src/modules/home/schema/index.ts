import { z } from 'zod';
export const formSchema = z.object({
  branch_id: z.string().optional(),
  company_id: z.string().optional(),
  customer_name: z.string().min(1, 'Имя обязательно'),
  customer_phone: z.string().min(1, 'Телефон обязателен'),
  type: z.string().min(1, 'Тип обязателен'),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  rate: z.number(),
  review_target_id: z.string().min(1, 'Продукт обязателен'),
});
