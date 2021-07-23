import { convert } from 'dinero.js';

const rates = {
  EUR: {
    amount: 83,
    scale: 2,
  },
};

function converter(dineroObject, newCurrency) {
  return convert(dineroObject, newCurrency, rates);
}

export function createConverter({ code }) {
  return code === 'USD' ? (x) => x : converter;
}
