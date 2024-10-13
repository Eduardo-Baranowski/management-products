import { injectable } from 'tsyringe';

import { PrismaProductRepository } from '@/repositories';

@injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: PrismaProductRepository) {}

  async execute(productId: string): Promise<void> {
    await this.productRepository.delete(String(productId));
  }
}
