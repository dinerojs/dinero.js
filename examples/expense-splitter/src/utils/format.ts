import type { Dinero } from 'dinero.js';
import { toDecimal, toSnapshot } from 'dinero.js';

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

const formatters: Record<string, (dineroObject: Dinero<number>) => string> = {
  USD: intlFormat('en-US'),
  EUR: intlFormat('fr-FR'),
  GBP: intlFormat('en-GB'),
};

export function format(dineroObject: Dinero<number>): string {
  const { currency } = toSnapshot(dineroObject);
  const formatFn = formatters[currency.code] || formatters.USD;

  return formatFn(dineroObject);
}
