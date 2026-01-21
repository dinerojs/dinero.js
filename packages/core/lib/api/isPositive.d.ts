import type { Calculator, Dinero } from '../types';
export declare type IsPositiveParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>
];
export declare function isPositive<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;
