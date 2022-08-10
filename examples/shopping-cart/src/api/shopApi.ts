/**
 * Mocking Shop API
 */
import _products from './products.json';
import { ShopProduct } from '../abstractions/shopProduct';
import { TIMEOUT } from '../constants/timeout';

const buyProducts = (products: ShopProduct[], total: number) => new Promise<void>((resolve) => {
    setTimeout(() => {
        alert(`Checking out ${products.map(x => x.quantity).reduce((x, y) => x + y)} item(s)\nYour total is $${total}`);
        resolve();
    }, TIMEOUT);
});

const getProducts = () => new Promise<ShopProduct[]>((resolve) => {
    setTimeout(() => resolve(_products), TIMEOUT);
});

export default { getProducts, buyProducts };