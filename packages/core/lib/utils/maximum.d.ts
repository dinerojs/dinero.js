import type { Calculator } from '../types';
declare type MaximumCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a maximum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The maximum function.
 */
export declare function maximum<TAmount>(calculator: MaximumCalculator<TAmount>): (values: readonly TAmount[]) => TAmount;
export {};
