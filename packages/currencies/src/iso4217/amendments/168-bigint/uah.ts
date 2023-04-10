import type { Currency } from '../../../types';

/**
 * Ukrainian hryvnia.
 */
export const UAH: Currency<bigint> = {
  code: 'UAH',
  base: 10n,
  exponent: 2n,
};
