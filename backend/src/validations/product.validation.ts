import { z } from 'zod';

export const createProductBodySchema = z.object({
  name: z.string({ required_error: 'Informe o nome' }),
  description:z.string({ required_error: 'Informe a descrição' }),
  color: z.string({ required_error: 'Informe a cor' }),
  categoryId: z.number(),
  price: z.number(),
});

export const updateProductBodySchema = z.object({
  id: z.number(),
  name: z.string({ required_error: 'Informe o nome' }),
  description:z.string({ required_error: 'Informe a descrição' }),
  color: z.string({ required_error: 'Informe a cor' }),
  categoryId: z.number(),
  price: z.number(),
});

export const listProductsQuerySchema = {
  filterFields: z.object({
    name: z.string(),
    id: z.number(),
  }),
};
