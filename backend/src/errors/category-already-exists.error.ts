export class CategoryAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'Categoria já existe');
    this.name = 'CategoryAlreadyExistsError';
  }
}
