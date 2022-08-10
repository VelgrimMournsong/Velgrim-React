export function createTestWrapper(wrappers: ((fn: () => void) => void)[]): (fn: () => void) => void {
    if (wrappers.length > 8) {
        throw new Error(`a max of 8 wrappers is supported, received ${wrappers.length} wrappers`);
    }

    return (fn: () => void) => {
        if (wrappers.length === 0) {
            fn();
            return;
        }

        wrappers[0](() => {
            if (wrappers.length === 1) {
                fn();
                return;
            }

            wrappers[1](() => {
                if (wrappers.length === 2) {
                    fn();
                    return;
                }

                wrappers[2](() => {
                    if (wrappers.length === 3) {
                        fn();
                        return;
                    }

                    wrappers[3](() => {
                        if (wrappers.length === 4) {
                            fn();
                            return;
                        }

                        wrappers[4](() => {
                            if (wrappers.length === 5) {
                                fn();
                                return;
                            }

                            wrappers[5](() => {
                                if (wrappers.length === 6) {
                                    fn();
                                    return;
                                }

                                wrappers[6](() => {
                                    if (wrappers.length === 7) {
                                        fn();
                                        return;
                                    }

                                    wrappers[7](() => {
                                        if (wrappers.length === 8) {
                                            fn();
                                            return;
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
}