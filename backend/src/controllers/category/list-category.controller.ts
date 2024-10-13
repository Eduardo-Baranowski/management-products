import { Request, Response } from 'express';

import { injectable } from 'tsyringe';

import { ListCategorysUseCase } from '@/use-cases/category';

import { CategoryNotFoundError } from '@/errors';

@injectable()
export class ListCategorysController {
  constructor(private readonly listCategory: ListCategorysUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = {
      page: Number(request.query.page),
      limit: Number(request.query.limit),
    };

    try {
      const categories = await this.listCategory.execute(input);

      return response.json(categories).end();
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      switch (error.constructor) {
        case CategoryNotFoundError:
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
