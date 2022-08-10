import { ReduceFn } from '@velgrim/rxjs';
import { ShopProduct } from '../../../abstractions/shopProduct';

export interface CartActions {
    addToCart: ReduceFn<CartState, { productId: number }>;
    removeFromCart: ReduceFn<CartState, { productId: number }>;
}

export interface CartProps {
    products: ShopProduct[];
}

export interface CartState {
    products: ShopProduct[];
    total: number;
}
