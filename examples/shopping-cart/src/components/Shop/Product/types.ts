import { ShopProduct } from '../../../abstractions/shopProduct';

export type ProductProps = ShopProduct & {
    inCart?: boolean;
}