import type { CompareParams } from '@dinero.js/core';
/**
 * Compare the value of a Dinero object relative to another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns One of -1, 0, or 1 depending on whether the first Dinero object is less than, equal to, or greater than the other.
 *
 * @public
 */
export declare function compare<TAmount>(...[dineroObject, comparator]: CompareParams<TAmount>): import("@dinero.js/core").ComparisonOperator;
