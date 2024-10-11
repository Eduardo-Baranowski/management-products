export class ProductsFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Nenhuma leitura encontrada');
    this.name = 'ProductsFoundError';
  }
}
