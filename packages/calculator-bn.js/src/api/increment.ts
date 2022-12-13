import type { UnaryOperation } from '@dinero.js/core';
import type BN from 'bn.js';

import { ONE } from './constants';

/**
 * Returns an incremented BN.
 *
 * @param value - The BN to increment.
 *
 * @returns The incremented BN.
 */
export const increment: UnaryOperation<BN> = (value) => {
  return value.add(ONE);
};
