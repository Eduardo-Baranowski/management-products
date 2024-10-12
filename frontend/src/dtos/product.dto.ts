import { OrderByValue, PaginationInputDto, PaginationOutputDto } from './pagination.dto';

export type ProductDto = {
  id: number;
  name: string;
  description: string;
  color: string;
  categoryId: number;
  price: number;
  promotionalPrice: number;
};

export type ProductOutputDto = Omit<ProductDto, 'id'> & {
  name: string;
  description: string;
  color: string;
  categoryId: number;
  price: number;
  promotionalPrice: number;
};

export type ProductExistsInputDto = {
  id?: number;
};

export type CreateProductInputDto = {
  name: string;
  description: string;
  color: string;
  categoryId: number;
  price: number;
};

export type UpdateProductInputDto = {
  id: number;
  name: string;
  description: string;
  color: string;
  categoryId: number;
  price: number;
  promotionalPrice?: number;
};

export type FindAllProductsOrderByFields = {
  updatedAt: OrderByValue;
  name: OrderByValue;
};

export type FindAllProductsFilterFields = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FindAllProductsInputDto = PaginationInputDto<
  FindAllProductsOrderByFields,
  FindAllProductsFilterFields
>;

export type FindAllProductsOutputDto = PaginationOutputDto<ProductOutputDto>;

export type CountProductsInputDto = Partial<FindAllProductsFilterFields>;

export type FindAllProductsOutPutDto = {
  name: string;
  description: string;
  color: string;
  categoryId: number;
  price: number;
  promotionalPrice: number;
};
