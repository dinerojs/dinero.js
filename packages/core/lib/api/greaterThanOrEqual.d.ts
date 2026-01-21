import type { Calculator, Dinero } from '../types';
export declare type GreaterThanOrEqualParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
];
export declare function safeGreaterThanOrEqual<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;
