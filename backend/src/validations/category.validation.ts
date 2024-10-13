import { z } from 'zod';

import { FindAllCategoriesOrderByFields } from '@/dtos';

import { paginationValidation } from './pagination';

export const createCategoryBodySchema = z.object({
  name: z.string({ required_error: 'Informe o nome' }),
  discount: z.number(),
});

export const updateCategoryBodySchema = z.object({
  id: z.number(),
  name: z.string({ required_error: 'Informe o nome' }),
  description: z.string({ required_error: 'Informe a descrição' }),
  color: z.string({ required_error: 'Informe a cor' }),
  categoryId: z.number(),
  price: z.number(),
});

export const listCategoriesQuerySchema = paginationValidation<FindAllCategoriesOrderByFields>({
  orderFields: ['name', 'updatedAt'],
  filterFields: z.object({
    name: z.string().optional(),
  }),
});
