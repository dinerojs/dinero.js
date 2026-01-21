import type { Calculator, Dinero, ScaledAmount } from '../types';
export declare type MultiplyParams<TAmount> = readonly [
    multiplicand: Dinero<TAmount>,
    multiplier: ScaledAmount<TAmount> | TAmount
];
export declare function multiply<TAmount>(calculator: Calculator<TAmount>): (multiplicand: Dinero<TAmount>, multiplier: TAmount | ScaledAmount<TAmount>) => Dinero<TAmount>;
