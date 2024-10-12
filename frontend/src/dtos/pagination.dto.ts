export type OrderByValue = 'asc' | 'desc';

type OrderBy<T> = {
  [P in keyof T]?: OrderByValue;
};

export type PaginationInputDto<OrderFields = unknown, FilterFields = unknown> = {
  page?: number;
  limit?: number;
  orderBy?: OrderBy<OrderFields>;
} & {
  [P in keyof FilterFields]?: FilterFields[P];
};

export interface PaginationOutputDto<T> {
  items: T[];
  total: number;
  currentPage: number;
  totalInPage: number;
  totalPages: number;
  prevPage?: number | undefined;
  nextPage?: number | undefined;
}
