import { convert } from 'dinero.js';

function createConverter(rates) {
  return function converter(dineroObject, newCurrency) {
    return convert(dineroObject, newCurrency, rates);
  };
}

const converter = createConverter({
  EUR: {
    amount: 83,
    scale: 2,
  },
});

export function createConvert({ code }) {
  return code === 'USD' ? (x) => x : converter;
}
