import type { Calculator, Dinero, DivideOperation } from '../types';
export declare type TransformScaleParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>,
    newScale: TAmount,
    divide?: DivideOperation
];
export declare function transformScale<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>, newScale: TAmount, divide?: DivideOperation | undefined) => Dinero<TAmount>;
