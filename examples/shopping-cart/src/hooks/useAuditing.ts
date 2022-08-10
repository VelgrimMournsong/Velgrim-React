import auditApi from '../api/auditApi';
import { useShopEvents } from '../components/Shop/events';

export function useAuditing(): void {
    const { addToCart$, checkout$, removeFromCart$ } = useShopEvents();

    addToCart$.useSubscription((value) => {
        auditApi.audit('add-to-cart', value).catch(ex => console.log(ex));
    }, []);

    checkout$.useSubscription((value) => {
        auditApi.audit('checkout', value).catch(ex => console.log(ex));
    }, []);

    removeFromCart$.useSubscription((value) => {
        auditApi.audit('remove-from-cart', value).catch(ex => console.log(ex));
    });
}
