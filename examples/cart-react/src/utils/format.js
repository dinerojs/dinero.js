import { createFormatter } from 'dinero.js';

export const format = createFormatter(({ amount, currency }) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.exponent,
    maximumFractionDigits: currency.exponent,
  });

  return `$${numberFormatter.format(amount)}`;
});
