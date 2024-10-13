import { Router } from 'express';

import { container } from 'tsyringe';

import { CreateCategoryController, ListCategorysController } from '@/controllers';

import { createCategoryBodySchema, listCategoriesQuerySchema } from '@/validations';

import { validateRequest } from '@/middleware';

const router = Router();

const listCategoryController = container.resolve(ListCategorysController);
const createCategoryController = container.resolve(CreateCategoryController);

router.get(
  '/categories',
  validateRequest({
    query: listCategoriesQuerySchema,
  }),
  listCategoryController.handle.bind(listCategoryController),
);

router.post(
  '/category',
  validateRequest({
    body: createCategoryBodySchema,
  }),
  createCategoryController.handle.bind(createCategoryController),
);

export default router;
