import type { EqualParams } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is equal to another.
 *
 * @param dineroObject - The first Dinero object to compare.
 * @param comparator - The second Dinero object to compare.
 *
 * @returns Whether the Dinero objects are equal.
 *
 * @public
 */
export declare function equal<TAmount>(...[dineroObject, comparator]: EqualParams<TAmount>): boolean;
