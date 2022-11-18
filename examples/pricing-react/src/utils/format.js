import { hasSubUnits, toDecimal, toSnapshot } from 'dinero.js';

export function format(dineroObject) {
  function transformer({ value, currency }) {
    const { scale } = toSnapshot(dineroObject);
    const minimumFractionDigits = hasSubUnits(dineroObject) ? scale : 0;

    return Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: scale,
      minimumFractionDigits,
    });
  }

  return toDecimal(dineroObject, transformer);
}
