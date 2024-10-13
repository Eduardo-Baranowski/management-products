import { injectable } from 'tsyringe';

import { PrismaCategoryRepository } from '@/repositories';

import { FindAllCategorysInputDto, FindAllCategorysOutputDto } from '@/dtos';

import { makePagination } from '@/utils/pagination.util';

@injectable()
export class ListCategorysUseCase {
  constructor(private readonly categoryRepository: PrismaCategoryRepository) {}

  async execute(input: FindAllCategorysInputDto): Promise<FindAllCategorysOutputDto> {
    const { page, limit, orderBy, ...filters } = input;

    const [categories, total] = await Promise.all([
      this.categoryRepository.findAll({
        page,
        limit,
        orderBy,
        ...filters,
      }),
      this.categoryRepository.count(filters),
    ]);

    return makePagination({
      items: categories,
      total,
      currentPage: page ?? 1,
      limit,
    });
  }
}
