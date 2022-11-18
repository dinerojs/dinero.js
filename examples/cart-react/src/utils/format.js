import { toDecimal, toSnapshot } from 'dinero.js';

function intlFormat(locale, options = {}) {
  return function formatter(dineroObject) {
    function transformer({ value, currency }) {
      return Number(value).toLocaleString(locale, {
        ...options,
        style: 'currency',
        currency: currency.code,
      });
    }

    return toDecimal(dineroObject, transformer);
  };
}

function formatDefault(dineroObject) {
  return toDecimal(dineroObject, ({ value, currency }) => {
    return `${currency.code} ${Number(value).toFixed(currency.exponent)}`;
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
