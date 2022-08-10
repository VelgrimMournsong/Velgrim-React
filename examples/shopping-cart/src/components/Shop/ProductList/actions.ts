import { first } from '@velgrim/core';
import { ProductListActions } from './types';

export default function (): ProductListActions {
    return {
        addToCart: (products, { productId }) => {
            const product = first(products, x => x.id === productId)!;

            return [
                ...products.filter(x => x.id !== productId),
                { ...product, quantity: product.quantity - 1 }
            ];
        },
        removeFromCart: (products, { productId }) => {
            const product = first(products, x => x.id === productId)!;

            return [
                ...products.filter(x => x.id !== productId),
                { ...product, quantity: product.quantity + 1 }
            ];
        }
    };
}
