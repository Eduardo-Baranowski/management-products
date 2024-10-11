import { injectable } from 'tsyringe';

import { PrismaCategoryRepository, PrismaProductRepository } from '@/repositories';

import { UpdateProductInputDto, ProductOutputDto } from '@/dtos';

import { CategoryNotFoundError, ProductFoundError } from '@/errors';

@injectable()
export class UpdateProductUseCase {
  constructor(
    private readonly productRepository: PrismaProductRepository,
    private readonly categoryRepository: PrismaCategoryRepository,
  ) {}

  async execute(input: UpdateProductInputDto): Promise<ProductOutputDto> {
    const product = await this.productRepository.findById(input.id);
    if (!product) {
      throw new ProductFoundError();
    }

    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    const updatedProduct = await this.productRepository.update(input, category.discount);

    return updatedProduct;
  }
}
