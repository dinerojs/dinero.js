import type { GreaterThanParams } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 *
 * @public
 */
export declare function greaterThan<TAmount>(...[dineroObject, comparator]: GreaterThanParams<TAmount>): boolean;
