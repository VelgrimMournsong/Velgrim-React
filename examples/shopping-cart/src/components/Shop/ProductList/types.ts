import { ReduceFn } from '@velgrim/rxjs';
import { ShopProduct } from '../../../abstractions/shopProduct';

export interface ProductListActions {
    addToCart: ReduceFn<ShopProduct[], { productId: number }>;
    removeFromCart: ReduceFn<ShopProduct[], { productId: number }>;
}

export interface ProductListProps {
    products: ShopProduct[];
}
