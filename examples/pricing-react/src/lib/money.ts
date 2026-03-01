import {
  dinero,
  multiply,
  allocate,
  subtract,
  isZero,
  toDecimal,
} from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

export function fromMinorUnits(amount: number): Dinero<number> {
  return dinero({ amount, currency: USD });
}

export function formatMoney(amount: Dinero<number>): string {
  return toDecimal(amount, ({ value, currency }) =>
    Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
    })
  );
}

export { multiply, allocate, subtract, isZero };
