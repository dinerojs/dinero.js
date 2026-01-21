import type { Calculator, Dinero } from '../types';
export declare type HasSubUnitsParams<TAmount> = readonly [
    dineroObject: Dinero<TAmount>
];
export declare function hasSubUnits<TAmount>(calculator: Calculator<TAmount>): (dineroObject: Dinero<TAmount>) => boolean;
