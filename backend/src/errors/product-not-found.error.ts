export class ProductFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Produto não encontrado');
    this.name = 'ProductFoundError';
  }
}
