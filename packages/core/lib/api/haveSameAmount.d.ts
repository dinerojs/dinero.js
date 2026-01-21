import type { Calculator, Dinero } from '../types';
export declare type HaveSameAmountParams<TAmount> = readonly [
    dineroObjects: ReadonlyArray<Dinero<TAmount>>
];
export declare function haveSameAmount<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => boolean;
