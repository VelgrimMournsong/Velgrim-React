/**
 * Mocking Audit API
 */
import { TIMEOUT } from '../constants/timeout';
import { ShoppingCartActions } from '../types/shoppingCartActions';

const audit = (action: ShoppingCartActions, data?: any) => new Promise<void>((resolve) => {
    setTimeout(() => {
        if (!data) {
            console.log({ action });
        }
        else {
            console.log({ action, data });
        }

        resolve();
    }, TIMEOUT);
});

export default { audit };