import type { Calculator, Dinero, Transformer } from '../types';
export declare type ToDecimalParams<TAmount, TOutput> = readonly [
    dineroObject: Dinero<TAmount>,
    transformer?: Transformer<TAmount, TOutput, string>
];
export declare function toDecimal<TAmount, TOutput>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, transformer?: Transformer<TAmount, TOutput, string> | undefined) => string | TOutput;
