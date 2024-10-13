import { Request, Response } from 'express';

import { injectable } from 'tsyringe';
import { z } from 'zod';

import { listProductsQuerySchema } from '@/validations';

import { ListProductsUseCase } from '@/use-cases';

import { ProductsFoundError } from '@/errors';

type Query = z.infer<typeof listProductsQuerySchema>;

@injectable()
export class ListProductsController {
  constructor(private readonly listProduct: ListProductsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const products = await this.listProduct.execute(request.query as Query);

      return response.json(products).end();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      switch (error.constructor) {
        case ProductsFoundError:
          return response
            .status(404)
            .json({
              error_code: 'MEASURES_NOT_FOUND',
              error_description: 'Nenhuma leitura encontrada',
            })
            .end();
        default:
          throw error;
      }
    }
  }
}
