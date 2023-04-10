import type { Currency } from '../../../types';

/**
 * Renminbi (Chinese) yuan.
 */
export const CNY: Currency<bigint> = {
  code: 'CNY',
  base: 10n,
  exponent: 2n,
};
