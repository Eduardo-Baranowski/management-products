import { Request, Response } from 'express';

import { injectable } from 'tsyringe';
import { z } from 'zod';

import { createProductBodySchema } from '@/validations';

import { CreateProductUseCase } from '@/use-cases';

import { ProductAlreadyExistsError } from '@/errors';

import { httpError } from '@/utils';

type Body = z.infer<typeof createProductBodySchema>;

@injectable()
export class CreateProductController {
  constructor(private readonly createProduct: CreateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const product = await this.createProduct.execute(request.body as Body);

      return response.status(201).json(product).end();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      switch (error.constructor) {
        case ProductAlreadyExistsError:
          return response.status(409).json(httpError(error)).end();
        default:
          throw error;
      }
    }
  }
}
