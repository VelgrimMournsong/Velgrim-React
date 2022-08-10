import React from 'react';

export function useRerender(): () => void {
    const [, updateState] = React.useState({});
    return React.useCallback(() => updateState({}), []);
}
