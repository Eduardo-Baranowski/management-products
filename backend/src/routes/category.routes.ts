import { Router } from 'express';

import { container } from 'tsyringe';

import { ListCategorysController } from '@/controllers';

import { listCategoriesQuerySchema } from '@/validations';

import { validateRequest } from '@/middleware';

const router = Router();

const listCategoryController = container.resolve(ListCategorysController);

router.get(
  '/categories',
  validateRequest({
    query: listCategoriesQuerySchema,
  }),
  listCategoryController.handle.bind(listCategoryController),
);

export default router;
