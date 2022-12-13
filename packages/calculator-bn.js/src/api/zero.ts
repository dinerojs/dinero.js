import type BN from 'bn.js';

import { ZERO } from './constants';

/**
 * Return zero as a bigint.
 *
 * @returns Zero as a bigint.
 */
export function zero(): BN {
  return ZERO;
}
