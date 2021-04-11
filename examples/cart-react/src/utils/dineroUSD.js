import { dinero } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

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
