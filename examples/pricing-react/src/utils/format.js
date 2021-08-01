import { hasSubUnits, toFormat, toSnapshot } from 'dinero.js';

export function format(dineroObject) {
  function transformer({ decimal, currency }) {
    const { scale } = toSnapshot(dineroObject);
    const minimumFractionDigits = hasSubUnits(dineroObject) ? scale : 0;

    return Number(decimal).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: scale,
      minimumFractionDigits,
    });
  }

  return toFormat(dineroObject, transformer);
}
