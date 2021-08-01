import { isArray } from '../utils';
import { createGetDivisors } from '../utils/createGetDivisors';

import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type ToUnitsParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export type ToUnitsDependencies<TAmount> = Dependencies<TAmount>;

export function toUnits<TAmount>({ calculator }: ToUnitsDependencies<TAmount>) {
  const getDivisors = createGetDivisors(calculator);

  return function toUnitsFn(...[dineroObject]: ToUnitsParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const { power, integerDivide, modulo } = calculator;

    const bases = isArray(currency.base) ? currency.base : [currency.base];
    const divisors = getDivisors(bases.map((base) => power(base, scale)));

    return divisors.reduce<readonly TAmount[]>(
      (amounts, divisor, index) => {
        const amountLeft = amounts[index];

        const quotient = integerDivide(amountLeft, divisor);
        const remainder = modulo(amountLeft, divisor);

        return [...amounts.filter((_, i) => i !== index), quotient, remainder];
      },
      [amount]
    );
  };
}
