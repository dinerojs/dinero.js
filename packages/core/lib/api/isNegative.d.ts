import type { Calculator, Dinero } from '../types';
export declare type IsNegativeParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>
];
export declare function isNegative<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;
