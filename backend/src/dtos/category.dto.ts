import { OrderByValue, PaginationInputDto, PaginationOutputDto } from './pagination.dto';

export type CategoryDto = {
  id: number;
  name: string;
  discount: number;
};

export type CategoryOutputDto = Omit<CategoryDto, 'id'> & {
  name: string;
  discount: number;
};

export type CategoryExistsInputDto = {
  id?: number;
};

export type CreateCategoryInputDto = {
  name: string;
  discount: number;
};

export type UpdateCategoryInputDto = {
  id: number;
  name: string;
  discount: number;
};

export type FindAllCategoriesOrderByFields = {
  updatedAt: OrderByValue;
  name: OrderByValue;
};

export type FindAllCategoriesFilterFields = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FindAllCategorysInputDto = PaginationInputDto<
  FindAllCategoriesOrderByFields,
  FindAllCategoriesFilterFields
>;

export type FindAllCategorysOutputDto = PaginationOutputDto<CategoryOutputDto>;

export type CountCategorysInputDto = Partial<FindAllCategoriesFilterFields>;

export type FindAllCategorysOutPutDto = {
  name: string;
  discount: number;
};
