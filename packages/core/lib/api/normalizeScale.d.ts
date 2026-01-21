import type { Calculator, Dinero } from '../types';
export declare type NormalizeScaleParams<TAmount> = readonly [
    dineroObjects: ReadonlyArray<Dinero<TAmount>>
];
export declare function normalizeScale<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => Dinero<TAmount>[];
