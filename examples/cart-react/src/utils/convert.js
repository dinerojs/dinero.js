import { createConverter } from 'dinero.js';

const converter = createConverter({
  rates: {
    EUR: {
      rate: 83,
      scale: 2,
    }
  }
});

export function createConvert({ code }) {
  return code === 'USD' ? x => x : converter;
}
