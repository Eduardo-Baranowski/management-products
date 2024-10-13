import { Request, Response } from 'express';

import { injectable } from 'tsyringe';
import { z } from 'zod';

import { updateProductBodySchema } from '@/validations';

import { UpdateProductUseCase } from '@/use-cases';

import { ProductFoundError } from '@/errors';

type Body = z.infer<typeof updateProductBodySchema>;

@injectable()
export class UpdateProductController {
  constructor(private readonly updateProduct: UpdateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.updateProduct.execute({
        ...(request.body as Body),
      });

      return response.status(200).json({
        succes: true,
      });
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      switch (error.constructor) {
        case ProductFoundError:
          return response
            .status(404)
            .json({
              error_code: 'MEASURE_NOT_FOUND',
              error_description: 'Leitura do mês já realizada',
            })
            .end();
        default:
          throw error;
      }
    }
  }
}
