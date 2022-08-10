import { createEvents } from '@velgrim/rxjs';
import { ShopProduct } from '../../abstractions/shopProduct';
import { ShopEvents } from './types';

/**
 * Primary usage: define event object using 'rx' event factory lambda
 */
export const [useShopEvents, ShopEventsProvider] = createEvents<ShopEvents>(rx => ({
    addToCart$: rx<{ productId: number }>(),
    checkout$: rx<{ products: ShopProduct[], total: number }>(),
    removeFromCart$: rx<{ productId: number }>()
}));

/**
 * Alternate usage: array of event names
 */
// export const [useShopEvents, ShopEventsProvider] = createEventsUnsafe<ShopEvents>([
//     'addToCart$',
//     'checkout$',
//     'removeFromCart$'
// ]);

/**
 * Alternate usage: event state object with property names defined for the event context object
 */
// export const [useShopEvents, ShopEventsProvider] = createEventsUnsafe<ShopEvents>({
//     addToCart$: { productId: 0 },
//     checkout$: { products: 0, total: 0 },
//     removeFromCart$: { productId: 0 }
// });
