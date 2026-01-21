import type { Calculator, Dinero } from '../types';
export declare type SubtractParams<TAmount> = readonly [
    minuend: Dinero<TAmount>,
    subtrahend: Dinero<TAmount>
];
export declare function safeSubtract<TAmount>(calculator: Calculator<TAmount>): (minuend: Dinero<TAmount>, subtrahend: Dinero<TAmount>) => Dinero<TAmount>;
