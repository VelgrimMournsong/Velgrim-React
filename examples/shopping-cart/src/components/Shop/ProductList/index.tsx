import { FC } from 'react';
import { useShopEvents } from '../events';
import Product from '../Product';
import { ProductListProps } from './types';
import actions from './actions';

const ProductList: FC<ProductListProps> = ({ products: availableProducts }) => {
    const { useReducedState } = useShopEvents();
    const { addToCart, removeFromCart } = actions();

    const products = useReducedState(availableProducts, action => [
        action('addToCart$', addToCart),
        action('removeFromCart$', removeFromCart)
    ]);

    return (
        <div>
            <h3>Products</h3>
            <div>
                {products.sort((x, y) => x.id - y.id).map(product => <Product {...product} key={product.id} />)}
            </div>
        </div>
    );
};

export default ProductList;
