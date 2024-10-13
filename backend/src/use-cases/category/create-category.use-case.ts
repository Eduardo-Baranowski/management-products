import { injectable } from 'tsyringe';

import { PrismaCategoryRepository } from '@/repositories';

import { CreateCategoryInputDto, CategoryOutputDto } from '@/dtos';

// import { CategoryAlreadyExistsError } from '@/errors';

@injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: PrismaCategoryRepository) {}

  async execute(input: CreateCategoryInputDto): Promise<CategoryOutputDto> {
    // const category = await this.categoryRepository.findById(input.categoryId);

    // if (!category) {
    //   throw new CategoryNotFoundError();
    // }

    const category = await this.categoryRepository.create(input);

    return category;
  }
}
