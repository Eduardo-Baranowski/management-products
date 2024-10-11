import { Request, Response } from 'express';

import { injectable } from 'tsyringe';

import { ListProductsUseCase } from '@/use-cases/product';

import { ProductsFoundError } from '@/errors';

@injectable()
export class ListProductsController {
  constructor(private readonly listProduct: ListProductsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = {
      page: Number(request.query.page),
      limit: Number(request.query.limit),
    };

    try {
      const products = await this.listProduct.execute(input);

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
