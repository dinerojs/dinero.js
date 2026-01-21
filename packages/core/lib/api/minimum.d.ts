import type { Calculator, Dinero } from '../types';
export declare type MinimumParams<TAmount> = readonly [
    dineroObjects: ReadonlyArray<Dinero<TAmount>>
];
export declare function safeMinimum<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => Dinero<TAmount>;
