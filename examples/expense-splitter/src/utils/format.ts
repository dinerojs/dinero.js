import type { Dinero } from 'dinero.js';
import { toDecimal } from 'dinero.js';

function intlFormat(locale: string) {
  return function formatter(dineroObject: Dinero<number>): string {
    return toDecimal(dineroObject, ({ value, currency }) => {
      return Number(value).toLocaleString(locale, {
        style: 'currency',
        currency: currency.code,
      });
    });
  };
}

export function format(dineroObject: Dinero<number>): string {
  const formatFn = intlFormat('en-US');

  return formatFn(dineroObject);
}
