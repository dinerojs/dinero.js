import type { Calculator, Dinero } from '../types';
export declare type AddParams<TAmount> = readonly [
    augend: Dinero<TAmount>,
    addend: Dinero<TAmount>
];
export declare function safeAdd<TAmount>(calculator: Calculator<TAmount>): (augend: Dinero<TAmount>, addend: Dinero<TAmount>) => Dinero<TAmount>;
