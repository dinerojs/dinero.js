import type { Calculator, Dinero, Transformer } from '../types';
export declare type ToUnitsParams<TAmount, TOutput> = readonly [
    dineroObject: Dinero<TAmount>,
    transformer?: Transformer<TAmount, TOutput, readonly TAmount[]>
];
export declare function toUnits<TAmount, TOutput>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, transformer?: Transformer<TAmount, TOutput, readonly TAmount[]> | undefined) => TOutput | readonly TAmount[];
