import type { Calculator, Dinero } from '../types';
export declare type EqualParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
];
export declare function equal<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;
