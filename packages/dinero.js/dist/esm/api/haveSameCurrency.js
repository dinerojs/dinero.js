import { haveSameCurrency as coreHaveSameCurrency } from '@dinero.js/core';

/**
 * Check whether a set of Dinero objects have the same currency.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same currency.
 *
 * @public
 */
export var haveSameCurrency = coreHaveSameCurrency;