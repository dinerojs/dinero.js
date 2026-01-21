import type { Calculator } from '../types';
declare type ComparisonCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a compare function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The compare function.
 */
export declare function compare<TAmount>(calculator: ComparisonCalculator<TAmount>): (subject: TAmount, comparator: TAmount) => import("../types").ComparisonOperator;
export {};
