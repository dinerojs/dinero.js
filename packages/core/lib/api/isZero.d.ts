import type { Calculator, Dinero } from '../types';
export declare type IsZeroParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];
export declare function isZero<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;
