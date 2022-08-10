import { FC, useEffect, useState } from 'react';
import { ShopProduct } from '../../abstractions/shopProduct';
import { useAuditing } from '../../hooks/useAuditing';
import Cart from './Cart';
import shopApi from '../../api/shopApi';
import { ShopEventsProvider, useShopEvents } from './events';
import ProductList from './ProductList';

const Shop: FC = () => {
    useAuditing();
    const [products, setProducts] = useState<ShopProduct[]>([]);
    useEffect(() => { shopApi.getProducts().then(setProducts); }, []);
    const { checkout$ } = useShopEvents();

    checkout$.useSubscription(({ products, total }) => {
        shopApi.buyProducts(products, total).then(() => window.location.reload());
    }, []);

    if (!products.length) {
        return <p>Loading Shop...</p>;
    }

    return (
        <>
            <ProductList products={products} />
            <hr/>
            <Cart products={products} />
        </>
    );
};

export default () => (
    <ShopEventsProvider>
        <Shop />
    </ShopEventsProvider>
);