import { toFormat, toSnapshot } from 'dinero.js';

function intlFormat(locale, options = {}) {
  return function formatter(dineroObject) {
    function transformer({ amount, currency }) {
      return amount.toLocaleString(locale, {
        ...options,
        style: 'currency',
        currency: currency.code,
      });
    }

    return toFormat(dineroObject, transformer);
  };
}

function formatDefault(dineroObject) {
  return toFormat(dineroObject, ({ amount, currency }) => {
    return `${currency.code} ${amount.toFixed(currency.exponent)}`;
  });
}

const formatters = {
  USD: intlFormat('en-US'),
  EUR: intlFormat('fr-FR'),
};

export function format(dineroObject) {
  const { currency } = toSnapshot(dineroObject);
  const formatFn = formatters[currency.code] || formatDefault;

  return formatFn(dineroObject);
}
