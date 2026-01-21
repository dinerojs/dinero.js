import type { Calculator, Dinero } from '../types';
export declare type TrimScaleParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];
export declare function trimScale<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => Dinero<TAmount>;
