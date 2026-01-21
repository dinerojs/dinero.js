import type { Calculator } from '../types';
declare type GreaterThanCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a greaterThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThan function.
 */
export declare function greaterThan<TAmount>(calculator: GreaterThanCalculator<TAmount>): (subject: TAmount, comparator: TAmount) => boolean;
export {};
