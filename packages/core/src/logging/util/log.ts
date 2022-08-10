let data: any[] = [];
const enqueue = (x: any) => data.push(x);

(enqueue as any).flush = () => {
    console.log(data);
    data = [];
};

export const log = enqueue as any as ((x: any) => void) & { flush: () => void };