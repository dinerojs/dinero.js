import type { Calculator } from '../types';
declare type DistributeCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a distribute function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The distribute function.
 */
export declare function distribute<TAmount>(calculator: DistributeCalculator<TAmount>): (value: TAmount, ratios: readonly TAmount[]) => readonly TAmount[];
export {};
