import type { Calculator, Dinero } from '../types';
export declare type MaximumParams<TAmount> = readonly [
    dineroObjects: ReadonlyArray<Dinero<TAmount>>
];
export declare function safeMaximum<TAmount>(calculator: Calculator<TAmount>): (dineroObjects: readonly Dinero<TAmount>[]) => Dinero<TAmount>;
