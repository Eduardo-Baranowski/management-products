import { Request, Response } from 'express';

import { injectable } from 'tsyringe';
import { z } from 'zod';

import { createCategoryBodySchema } from '@/validations';

import { CreateCategoryUseCase } from '@/use-cases';

import { CategoryAlreadyExistsError } from '@/errors';

import { httpError } from '@/utils';

type Body = z.infer<typeof createCategoryBodySchema>;

@injectable()
export class CreateCategoryController {
  constructor(private readonly createCategory: CreateCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const category = await this.createCategory.execute(request.body as Body);

      return response.status(201).json(category).end();
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      switch (error.constructor) {
        case CategoryAlreadyExistsError:
          return response.status(409).json(httpError(error)).end();
        default:
          throw error;
      }
    }
  }
}
