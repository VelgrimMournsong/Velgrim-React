import { Observable, OperatorFunction } from 'rxjs';

export function _reduceOperators(
    args: (OperatorFunction<any, any> | OperatorFunction<any, any>[])[]
): OperatorFunction<any, any> {
    let operators: OperatorFunction<any, any>[];

    if (Array.isArray(args[0])) {
        operators = args[0] as OperatorFunction<any, any>[];
    }
    else {
        operators = args as OperatorFunction<any, any>[];
    }

    operators = Array.isArray(operators) ? operators : [operators];

    if (operators.length === 0) {
        return (x => x) as OperatorFunction<any, any>;
    }

    if (operators.length === 1) {
        return operators[0];
    }

    return (observable: Observable<any>) => {
        return operators.reduce(
            (previous: any, operator: OperatorFunction<any, any>) => operator(previous),
            observable as any
        ) as Observable<any>;
    };
}