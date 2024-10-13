import { injectable } from 'tsyringe';

import {
  CountProductsInputDto,
  CreateProductInputDto,
  FindAllProductsInputDto,
  FindAllProductsOutPutDto,
  ProductDto,
  ProductExistsInputDto,
  ProductOutputDto,
  UpdateProductInputDto,
} from '@/dtos';

import { Product as PrismaProduct, Category as PrismaCategory } from '@prisma/client';

import { BaseRepository } from './base-repository';

@injectable()
export class PrismaProductRepository extends BaseRepository {
  async exists(input: ProductExistsInputDto): Promise<boolean> {
    const { id } = input;

    const product = await this.client.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return !!product;
  }

  async findById(id: number): Promise<ProductOutputDto | undefined> {
    const product = await this.client.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) return undefined;

    return PrismaProductRepository.mapToWithOutCategoryDto(product);
  }

  async delete(id: string): Promise<void> {
    const listaIds = id.split(',');
    listaIds.forEach(async idLista => {
      await this.client.product.delete({
        where: {
          id: Number(idLista),
        },
      });
    });
  }

  async create(input: CreateProductInputDto, discount: number): Promise<ProductOutputDto> {
    const { categoryId, color, description, name, price } = input;

    const product = await this.client.product.create({
      data: {
        categoryId,
        color,
        description,
        name,
        price,
        promotionalPrice: price - (price * discount) / 100,
      },
      select: {
        id: true,
        categoryId: true,
        color: true,
        description: true,
        category: true,
        name: true,
        price: true,
        promotionalPrice: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return PrismaProductRepository.mapToDto(product);
  }

  async update(input: UpdateProductInputDto, discount: number): Promise<ProductOutputDto> {
    const product = await this.client.product.update({
      where: {
        id: input.id,
      },
      data: {
        categoryId: input.categoryId,
        color: input.color,
        description: input.description,
        name: input.name,
        price: input.price,
        promotionalPrice: input.price - (input.price * discount) / 100,
      },
    });

    return PrismaProductRepository.mapToWithOutCategoryDto(product);
  }

  private where(input: CountProductsInputDto): object {
    const where = {};

    if (input.name) {
      Object.assign(where, {
        name: {
          contains: input.name,
          mode: 'insensitive',
        },
      });
    }

    if (input.categoryId) {
      Object.assign(where, {
        categoryId: {
          equals: Number(input.categoryId),
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

  async findAll(input: FindAllProductsInputDto): Promise<FindAllProductsOutPutDto[]> {
    const { page, limit, ...filters } = input;

    const offset = page && limit && (page - 1) * limit;

    const products = await this.client.product.findMany({
      select: {
        id: true,
        categoryId: true,
        color: true,
        description: true,
        category: true,
        name: true,
        price: true,
        promotionalPrice: true,
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

    return products.map(PrismaProductRepository.mapToDto);
  }

  async count(input: CountProductsInputDto): Promise<number> {
    const count = await this.client.product.count({
      where: this.where(input),
    });

    return count;
  }

  static mapToDto(product: PrismaProduct & { category: PrismaCategory }): ProductDto {
    return {
      id: product.id,
      categoryId: product.categoryId,
      color: product.color,
      description: product.description,
      category: product.category,
      name: product.name,
      price: product.price,
      promotionalPrice: product.promotionalPrice,
    };
  }

  static mapToWithOutCategoryDto(product: PrismaProduct): ProductDto {
    return {
      id: product.id,
      categoryId: product.categoryId,
      color: product.color,
      description: product.description,
      name: product.name,
      price: product.price,
      promotionalPrice: product.promotionalPrice,
    };
  }
}
