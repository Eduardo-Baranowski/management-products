import { Request, Response } from 'express';

import { injectable } from 'tsyringe';

import { DeleteProductUseCase } from '@/use-cases';

import { ProductFoundError } from '@/errors';

import { httpError } from '@/utils';

@injectable()
export class DeleteProductController {
  constructor(private readonly deleteProduct: DeleteProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.deleteProduct.execute(request.params.productId);

      return response.sendStatus(204).end();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      switch (error.constructor) {
        case ProductFoundError:
          return response.status(404).json(httpError(error)).end();
        default:
          throw error;
      }
    }
  }
}
