import { PaginationOutputDto } from '@/dtos';

export interface MakePaginationInput<T> {
  total: number;
  items: T[];
  currentPage: number;
  limit?: number;
}

export const makePagination = <T>(input: MakePaginationInput<T>): PaginationOutputDto<T> => {
  const totalPages = input.limit ? Math.ceil(input.total / input.limit) : 1;
  const totalInPage = input.limit ? Math.min(input.limit, input.items.length) : input.total;
  const prevPage = input.currentPage > 1 ? input.currentPage - 1 : undefined;
  const nextPage = input.currentPage < totalPages ? input.currentPage + 1 : undefined;

  return {
    items: input.items,
    total: input.total,
    currentPage: input.currentPage,
    totalInPage,
    prevPage,
    nextPage,
    totalPages,
  };
};
