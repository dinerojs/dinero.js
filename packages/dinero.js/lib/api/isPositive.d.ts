import type { IsPositiveParams } from '@dinero.js/core';
/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is positive.
 *
 * @public
 */
export declare function isPositive<TAmount>(...[dineroObject]: IsPositiveParams<TAmount>): boolean;
