import type { Dinero } from 'dinero.js';
import { toDecimal } from 'dinero.js';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function format(dineroObject: Dinero<number>): string {
  return toDecimal(dineroObject, ({ value }) => {
    return formatter.format(Number(value));
  });
}
