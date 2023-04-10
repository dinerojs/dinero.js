import type { Currency } from '../../../types';

/**
 * Bermudian dollar.
 */
export const BMD: Currency<bigint> = {
  code: 'BMD',
  base: 10n,
  exponent: 2n,
};
