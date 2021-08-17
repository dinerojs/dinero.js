import type { Calculator, Dinero } from '../types';
import { isArray, getDivisors } from '../utils';

export type ToUnitsParams<TAmount> = readonly [dineroObject: Dinero<TAmount>];

export function toUnits<TAmount>(calculator: Calculator<TAmount>) {
  const getDivisorsFn = getDivisors(calculator);

  return function toUnitsFn(...[dineroObject]: ToUnitsParams<TAmount>) {
    const { amount, currency, scale } = dineroObject.toJSON();
    const { power, integerDivide, modulo } = calculator;

    const bases = isArray(currency.base) ? currency.base : [currency.base];
    const divisors = getDivisorsFn(bases.map((base) => power(base, scale)));

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
