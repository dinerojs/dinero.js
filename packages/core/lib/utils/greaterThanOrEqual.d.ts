import type { Calculator } from '../types';
declare type GreaterThanOrEqualCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a greaterThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThanOrEqual function.
 */
export declare function greaterThanOrEqual<TAmount>(calculator: GreaterThanOrEqualCalculator<TAmount>): (subject: TAmount, comparator: TAmount) => boolean;
export {};
