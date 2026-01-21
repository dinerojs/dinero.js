import type { Calculator, Dinero } from '../types';
export declare type LessThanParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
];
export declare function safeLessThan<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;
