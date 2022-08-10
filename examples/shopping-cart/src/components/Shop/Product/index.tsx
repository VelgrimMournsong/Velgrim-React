import { FC } from 'react'
import { useShopEvents } from '../events';
import { ProductProps } from './types';

const Product: FC<ProductProps> = ({ id, inCart, price, quantity, title }) => {
    const { addToCart$, removeFromCart$ } = useShopEvents();

    return (
        <div style={{ marginBottom: 20 }}>
            <div>
                {title} - &#36;{price}{quantity ? ` x ${quantity}` : null}
            </div>
            {(!inCart ? (
                <button onClick={() => addToCart$.dispatch({ productId: id })} disabled={!quantity}>
                    {quantity ? 'Add to cart' : 'Sold Out'}
                </button>
            ) : (
                <button onClick={() => removeFromCart$.dispatch({ productId: id })}>Remove from cart</button>
            ))}
        </div>
    );
};

export default Product;
