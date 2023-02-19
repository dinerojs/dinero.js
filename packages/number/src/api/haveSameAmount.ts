import { calculator } from '../calculator';

import { haveSameAmount as coreHaveSameAmount } from '@dinero.js/core';

/**
 * Check whether a set of Dinero objects have the same amount.
 *
 * @param dineroObjects - The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same amount.
 *
 * @public
 */
export const haveSameAmount = coreHaveSameAmount(calculator);
