export class ProductFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Leitura não encontrado');
    this.name = 'ProductFoundError';
  }
}
