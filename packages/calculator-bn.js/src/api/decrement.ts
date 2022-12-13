import type { UnaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

import { ONE } from './constants';

/**
 * Returns an decremented BN.
 *
 * @param value - The BN to decrement.
 *
 * @returns The decremented BN.
 */
export const decrement: UnaryOperation<BN> = (value) => {
  return value.sub(ONE);
};
