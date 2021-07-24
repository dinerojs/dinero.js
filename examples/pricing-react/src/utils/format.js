import { hasSubUnits, toFormat, toSnapshot } from 'dinero.js';

export function format(dineroObject) {
  function transformer({ amount, currency }) {
    const { scale } = toSnapshot(dineroObject);
    const minimumFractionDigits = hasSubUnits(dineroObject) ? scale : 0;

    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: scale,
      minimumFractionDigits,
    });
  }

  return toFormat(dineroObject, transformer);
}
