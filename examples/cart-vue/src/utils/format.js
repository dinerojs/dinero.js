import { toFormat, toSnapshot } from 'dinero.js';

function createFormatter(transformer, options = {}) {
  return function formatter(dineroObject) {
    return toFormat(dineroObject, transformer, options);
  };
}

const formatUSD = createFormatter(({ amount, currency }) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.exponent,
    maximumFractionDigits: currency.exponent,
  });

  return `$${numberFormatter.format(amount)}`;
});

const formatEUR = createFormatter(({ amount, currency }) => {
  const numberFormatter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: currency.exponent,
    maximumFractionDigits: currency.exponent,
  });

  return `${numberFormatter.format(amount)} €`;
});

const formatDefault = createFormatter(({ amount, currency }) => {
  return `${currency.code} ${amount.toFixed(currency.exponent)}`;
});

const formatters = {
  USD: formatUSD,
  EUR: formatEUR,
};

export function format(dineroObject) {
  const { currency } = toSnapshot(dineroObject);
  const formatFn = formatters[currency.code] || formatDefault;

  return formatFn(dineroObject);
}
