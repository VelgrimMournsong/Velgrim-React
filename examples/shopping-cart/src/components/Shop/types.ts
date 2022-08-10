import { RxEvent } from '@velgrim/rxjs';
import { ShopProduct } from '../../abstractions/shopProduct';

export interface ShopEvents {
    addToCart$: RxEvent<{ productId: number }>;
    checkout$: RxEvent<{ products: ShopProduct[], total: number }>;
    removeFromCart$: RxEvent<{ productId: number }>;
}
