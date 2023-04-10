import type { Currency } from '../../../types';

/**
 * Nigerian naira.
 */
export const NGN: Currency<bigint> = {
  code: 'NGN',
  base: 10n,
  exponent: 2n,
};
