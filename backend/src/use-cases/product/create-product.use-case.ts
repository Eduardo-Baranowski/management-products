import { injectable } from 'tsyringe';

import { PrismaProductRepository, PrismaCategoryRepository } from '@/repositories';

import { CreateProductInputDto, ProductOutputDto } from '@/dtos';

import { CategoryNotFoundError } from '@/errors';

@injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: PrismaProductRepository,
    private readonly categoryRepository: PrismaCategoryRepository,
  ) {}

  async execute(input: CreateProductInputDto): Promise<ProductOutputDto> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const product = await this.productRepository.create(input, category.discount);

    return product;
  }
}
