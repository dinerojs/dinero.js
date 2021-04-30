import { USD } from '@dinero.js/currencies';
import { dinero } from 'dinero.js';

function partialDinero({ currency, scale }) {
  return (amount) => {
    return dinero({
      amount,
      currency,
      scale,
    });
  };
}

export const dineroUSD = partialDinero({ currency: USD });
