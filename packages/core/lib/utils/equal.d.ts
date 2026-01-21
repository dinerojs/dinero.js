import type { Calculator } from '../types';
declare type EqualCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns an equal function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The equal function.
 */
export declare function equal<TAmount>(calculator: EqualCalculator<TAmount>): (subject: TAmount, comparator: TAmount) => boolean;
export {};
