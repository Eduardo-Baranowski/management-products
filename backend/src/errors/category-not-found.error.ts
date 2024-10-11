export class CategoryNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Categoria não encontrada');
    this.name = 'CategoryNotFoundError';
  }
}
