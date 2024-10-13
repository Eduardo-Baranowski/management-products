import { Router } from 'express';

import { container } from 'tsyringe';

import {
  CreateProductController,
  DeleteProductController,
  ListProductsController,
  UpdateProductController,
} from '@/controllers';

import {
  createProductBodySchema,
  listProductsQuerySchema,
  updateProductBodySchema,
} from '@/validations';

import { validateRequest } from '@/middleware';

const router = Router();

const createProductController = container.resolve(CreateProductController);
const updateProductController = container.resolve(UpdateProductController);
const listProductController = container.resolve(ListProductsController);
const deleteProductController = container.resolve(DeleteProductController);

router.post(
  '/product',
  validateRequest({
    body: createProductBodySchema,
  }),
  createProductController.handle.bind(createProductController),
);

router.patch(
  '/confirm',
  validateRequest({
    body: updateProductBodySchema,
  }),
  updateProductController.handle.bind(updateProductController),
);

router.get(
  '/products',
  validateRequest({
    query: listProductsQuerySchema,
  }),
  listProductController.handle.bind(listProductController),
);

router.delete('/product/:productId', deleteProductController.handle.bind(deleteProductController));

export default router;
