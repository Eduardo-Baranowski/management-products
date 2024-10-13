import { injectable } from 'tsyringe';

import {
  CountCategorysInputDto,
  CreateCategoryInputDto,
  FindAllCategorysInputDto,
  FindAllCategorysOutPutDto,
  CategoryDto,
  CategoryExistsInputDto,
  CategoryOutputDto,
} from '@/dtos';

import { Category as PrismaCategory } from '@prisma/client';

import { BaseRepository } from './base-repository';

@injectable()
export class PrismaCategoryRepository extends BaseRepository {
  async exists(input: CategoryExistsInputDto): Promise<boolean> {
    const { id } = input;

    const category = await this.client.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return !!category;
  }

  async findById(id: number): Promise<CategoryOutputDto | undefined> {
    const category = await this.client.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) return undefined;

    return PrismaCategoryRepository.mapToDto(category);
  }

  async create(input: CreateCategoryInputDto): Promise<CategoryOutputDto> {
    const { name, discount } = input;

    const category = await this.client.category.create({
      data: {
        name,
        discount,
      },
      select: {
        id: true,
        discount: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return PrismaCategoryRepository.mapToDto(category);
  }

  async update(input: CategoryDto): Promise<CategoryOutputDto> {
    const category = await this.client.category.update({
      where: {
        id: input.id,
      },
      data: {
        discount: input.discount,
        name: input.name,
      },
    });

    return PrismaCategoryRepository.mapToDto(category);
  }

  private where(input: CountCategorysInputDto): object {
    const where = {};

    if (input.name) {
      Object.assign(where, {
        name: {
          contains: input.name,
          mode: 'insensitive',
        },
      });
    }

    if (input.createdAt) {
      Object.assign(where, {
        createdAt: {
          gte: input.createdAt,
        },
      });
    }

    if (input.updatedAt) {
      Object.assign(where, {
        updatedAt: {
          lte: input.updatedAt,
        },
      });
    }

    return where;
  }

  async findAll(input: FindAllCategorysInputDto): Promise<FindAllCategorysOutPutDto[]> {
    const { page, limit, ...filters } = input;

    const offset = page && limit && (page - 1) * limit;

    const categorys = await this.client.category.findMany({
      select: {
        id: true,
        discount: true,
        name: true,
        updatedAt: true,
        createdAt: true,
      },
      skip: offset,
      take: limit,
      where: this.where(filters),

      orderBy: {
        id: 'asc',
      },
    });

    return categorys.map(PrismaCategoryRepository.mapToDto);
  }

  async count(input: CountCategorysInputDto): Promise<number> {
    const count = await this.client.category.count({
      where: this.where(input),
    });

    return count;
  }

  static mapToDto(category: PrismaCategory): CategoryDto {
    return {
      id: category.id,
      discount: category.discount,
      name: category.name,
    };
  }
}
