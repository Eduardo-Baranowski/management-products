import { Router } from 'express';

import { container } from 'tsyringe';

import { CreateProductController } from '@/controllers';
import { ListProductsController } from '@/controllers/product/list-product.controller';
import { UpdateProductController } from '@/controllers/product/update-product.controller';

import { createProductBodySchema, updateProductBodySchema } from '@/validations';

import { validateRequest } from '@/middleware';

const router = Router();

const createProductController = container.resolve(CreateProductController);
const updateProductController = container.resolve(UpdateProductController);
const listProductController = container.resolve(ListProductsController);

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
  '/:customerCode/list/:measureType',
  listProductController.handle.bind(listProductController),
);

export default router;
