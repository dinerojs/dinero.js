import type { HaveSameAmountParams } from '@dinero.js/core';
/**
 * Check whether a set of Dinero objects have the same amount.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same amount.
 *
 * @public
 */
export declare function haveSameAmount<TAmount>(...[dineroObjects]: HaveSameAmountParams<TAmount>): boolean;
