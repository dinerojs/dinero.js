import type { Calculator, Dinero } from '../types';
export declare type GreaterThanParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    comparator: Dinero<TAmount>
];
export declare function safeGreaterThan<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, comparator: Dinero<TAmount>) => boolean;
