import type { Calculator, Dinero } from '../types';
export declare type LessThanOrEqualParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
];
export declare function safeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;
