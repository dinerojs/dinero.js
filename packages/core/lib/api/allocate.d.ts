import type { Calculator, Dinero, ScaledAmount } from '../types';
export declare type AllocateParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    ratios: ReadonlyArray<ScaledAmount<TAmount> | TAmount>
];
export declare function safeAllocate<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, ratios: readonly (TAmount | ScaledAmount<TAmount>)[]) => Dinero<TAmount>[];
