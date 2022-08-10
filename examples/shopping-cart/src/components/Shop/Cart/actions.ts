import { first } from '@velgrim/core';
import { ShopProduct } from '../../../abstractions/shopProduct';
import { calculateTotal } from '../../../util/calculateTotal';
import { CartActions } from './types';

export default function (availableProducts: ShopProduct[]): CartActions {
    return {
        addToCart: ({ products }, { productId }) => {
            const product =
                first(products, x => x.id === productId)
                ?? { ...first(availableProducts, x => x.id === productId)!, quantity: 0 };

            products = [
                ...products.filter(x => x.id !== productId),
                { ...product, quantity: product.quantity + 1 }
            ];

            return { products, total: calculateTotal(products) };
        },
        removeFromCart: ({ products }, { productId }) => {
            const product = first(products, x => x.id === productId)!;

            if (product.quantity === 1) {
                products = products.filter(x => x.id !== productId);
            }
            else {
                products = [
                    ...products.filter(x => x.id !== productId),
                    { ...product, quantity: product.quantity - 1 }
                ];
            }

            return { products, total: calculateTotal(products) };
        }
    };
}
