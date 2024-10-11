import { AnyZodObject, ZodEffects, z } from 'zod';

const validOrderRegex = /^(\w+[-+](, ?\w+[-+])*)?$/;

const validateOrder = (order?: string, validFields?: string[]): boolean => {
  if (!order) return true;

  if (!validFields) {
    throw new Error('You must provide validFields if you want to validate the order');
  }

  if (!validOrderRegex.test(order)) return false;

  const orderFields = order.split(',').map(field => field.trim());

  return orderFields.every(field => validFields.includes(field.replace(/[-+]/, '')));
};

const transformOder = (order?: string): Record<string, 'asc' | 'desc'> | undefined => {
  if (!order) return undefined;

  const orderFields = order.split(',').map(field => field.trim());

  return orderFields.reduce((acc, field) => {
    const key = field.replace(/[-+]/, '');
    const value = field.replace(/(\w+)([-+])/, '$2');

    return {
      ...acc,
      [key]: value === '-' ? 'desc' : 'asc',
    };
  }, {});
};

type Input<OrderFields = any> = {
  orderFields?: (keyof OrderFields)[];
  filterFields?: AnyZodObject | ZodEffects<AnyZodObject>;
};

export const paginationValidation = <OrderFields>({
  orderFields,
  filterFields, // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}: Input<OrderFields>) =>
  z
    .object({
      page: z
        .number({ invalid_type_error: 'A página deve ser um número', coerce: true })
        .min(1, 'A página deve ser maior que 0')
        .optional(),
      limit: z
        .number({ invalid_type_error: 'O limite deve ser um número', coerce: true })
        .min(1, 'O limite deve ser maior que 0')
        .optional(),
      orderBy: z
        .string({ invalid_type_error: 'A ordenação deve ser uma string' })
        .optional()
        .refine(order => validateOrder(order, orderFields as string[]), {
          message: 'A ordenação deve ser uma string no formato "campo1+,campo2-,campo3+"',
        })
        .transform(transformOder),
    })
    .and(filterFields ?? z.object({}))
    .transform(data => {
      if (!data.page && !data.limit) {
        return data;
      }

      if (data.page && data.limit) {
        return data;
      }

      if (data.page) {
        return {
          ...data,
          limit: 10,
        };
      }

      return {
        page: 1,
        ...data,
      };
    });
