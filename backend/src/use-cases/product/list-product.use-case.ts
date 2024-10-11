import { injectable } from 'tsyringe';

import { PrismaProductRepository } from '@/repositories';

import { FindAllProductsInputDto, FindAllProductsOutputDto, FindAllProductsOutPutDto } from '@/dtos';

import { makePagination } from '@/utils/pagination.util';

@injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: PrismaProductRepository) {}

  async execute(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto> {
    const { page, limit, orderBy, ...filters } = input;

    const [products, total] = await Promise.all([
      this.productRepository.findAll({
        page,
        limit,
        orderBy,
        ...filters,
      }),
      this.productRepository.count(filters),
    ]);

    return makePagination({
      items: products,
      total,
      currentPage: page ?? 1,
      limit,
    });
  }
}

