import type { GreaterThanOrEqualParams } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 *
 * @public
 */
export declare function greaterThanOrEqual<TAmount>(...[dineroObject, comparator]: GreaterThanOrEqualParams<TAmount>): boolean;
