import { Product } from '../models/product';

export interface ServerResponse {
    next: {
        page: number;
        limit: number;
    },
    prev: {
        page: number;
        limit: number;
    },
    paginatedProds: Product[];
}