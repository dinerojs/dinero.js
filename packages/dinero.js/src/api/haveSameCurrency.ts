import { haveSameCurrency as coreHaveSameCurrency } from '@dinero.js/core';

/**
 * Check whether a set of pure Dinero objects have the same currency.
 *
 * @param dineroObjects The pure Dinero objects to compare.
 *
 * @returns Whether the pure Dinero objects have the same currency.
 */
export const haveSameCurrency = coreHaveSameCurrency;
