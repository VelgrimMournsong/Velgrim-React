import { FC } from 'react'
import { useShopEvents } from '../events';
import Product from '../Product'
import { CartProps, CartState } from './types';
import actions from './actions';

const Cart: FC<CartProps> = ({ products: availableProducts }) => {
    const { checkout$, useReducedState } = useShopEvents();
    const { addToCart, removeFromCart } = actions(availableProducts);

    const { products, total } = useReducedState<CartState>({ products: [], total: 0 }, action => [
        action('addToCart$', addToCart),
        action('removeFromCart$', removeFromCart)
    ]);

    const onCheckoutClicked = () => checkout$.dispatch({ products, total });

    return (
        <div>
            <h3>Your Cart</h3>
            <div>
                {products.length ? (
                    products.sort((x, y) => x.id - y.id).map(product => (
                        <Product {...product} key={product.id} inCart />
                    ))
                ) : (
                    <em>Please add some products to cart.</em>
                )}
            </div>
            <p>Total: &#36;{total}</p>
            <button onClick={onCheckoutClicked} disabled={!products.length}>
                Checkout
            </button>
        </div>
    );
}

export default Cart;
