import { ShopProduct } from '../abstractions/shopProduct';

export function calculateTotal(products: ShopProduct[]): number {
    const total = products.length ? products.map(x => x.price * x.quantity).reduce((x, y) => x + y) : 0;
    return +total.toFixed(2);
}