import { FC, ReactElement } from 'react';

export type RxEventsProvider = (props: {
    children: ReactElement<any, FC<any>> | ReactElement<any, FC<any>>[]
}) => ReactElement<any, any> | null;