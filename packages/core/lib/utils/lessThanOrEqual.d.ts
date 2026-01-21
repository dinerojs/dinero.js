import type { Calculator } from '../types';
declare type LessThanOrEqualCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
export declare function lessThanOrEqual<TAmount>(calculator: LessThanOrEqualCalculator<TAmount>): (subject: TAmount, comparator: TAmount) => boolean;
export {};
