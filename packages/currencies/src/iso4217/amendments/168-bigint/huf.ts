import type { Currency } from '../../../types';

/**
 * Hungarian forint.
 */
export const HUF: Currency<bigint> = {
  code: 'HUF',
  base: 10n,
  exponent: 2n,
};
