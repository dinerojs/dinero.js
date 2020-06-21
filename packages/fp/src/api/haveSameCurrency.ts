import { haveSameCurrency } from '@dinero.js/core';

/**
 * Check whether a set of functional Dinero objects have the same currency.
 *
 * @param dineroObjects The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects have the same currency.
 */
const functionalHaveSameCurrency = haveSameCurrency;

export default functionalHaveSameCurrency;
