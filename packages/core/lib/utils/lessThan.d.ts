import type { Calculator } from '../types';
declare type LessThanCalculator<TAmount> = Calculator<TAmount>;
/**
 * Returns a lessThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThan function.
 */
export declare function lessThan<TAmount>(calculator: LessThanCalculator<TAmount>): (subject: TAmount, comparator: TAmount) => boolean;
export {};
