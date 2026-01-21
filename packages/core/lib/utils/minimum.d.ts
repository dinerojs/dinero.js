import type { Calculator } from '../types';
declare type MinimumCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a minimum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The minimum function.
 */
export declare function minimum<TAmount>(calculator: MinimumCalculator<TAmount>): (values: readonly TAmount[]) => TAmount;
export {};
