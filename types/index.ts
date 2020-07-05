import { AxiosResponse } from 'axios'

interface Response<T> {
    data: T;
    last_page: number;
}

export type ApiResponse<T> = AxiosResponse<Response<T>>

export interface ProductDto {
    id: string;
    name: string;
    sale_price: number;
    base_price: number;
    created_at: string;
}

export interface OptionDto{
    name: string;
    value: string;
    selected?: boolean;
}

export interface ProductOptionDto extends OptionDto {
    value: OrderCol
}

export interface FilterDto {
    option: OptionDto;
    minValue: string;
    maxValue: string;
}

export type ProductUrlQueryDto = {
    page?: string;
    perPage?: string;
    orderCol?: OrderCol;
    orderDirection?: OrderDirection;
}

export type OrderCol = 'name'|'base_price'|'sale_price'|'created_at';
export type OrderDirection = 'asc' | 'desc';
