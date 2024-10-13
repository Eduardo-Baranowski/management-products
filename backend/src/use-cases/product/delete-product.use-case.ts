import { injectable } from 'tsyringe';

import { PrismaProductRepository } from '@/repositories';

import { ProductFoundError } from '@/errors';

@injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: PrismaProductRepository) {}

  async execute(productId: string): Promise<void> {
    // const product = await this.productRepository.findById(productId);
    // if (!product) {
    //   throw new ProductFoundError();
    // }

    await this.productRepository.delete(String(productId));
  }
}
